import XLSX from 'xlsx';

function decompose(obj) {
  let arr = [];
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    let str = obj;
    if (str === null) str = 'null';
    if (str === undefined) str = 'undefined';
    arr.push({
      value: str,
    });
  }
  else {
    Object.keys(obj).forEach((key) => {
      arr = arr.concat(decompose(obj[key]).map(o => ({
        key: o.key ? `${key}.${o.key}` : key,
        value: o.value,
      })));
    });
  }
  return arr;
}
function makeBaseWorksheet (changeables, projectId) {
  let height = 1;
  let worksheet = {};
  worksheet[`A${height}`] = {
    t: 's',
    v: 'projectId',
  };
  worksheet[`B${height}`] = {
    t: 's',
    v: projectId,
  };
  changeables.forEach((o, objectI) => {
    height += 1;
    worksheet[`A${height}`] = {
      t: 's',
      v: `#${objectI}`,
    };
    o.forEach(({ key, value }) => {
      height += 1;
      worksheet[`A${height}`] = {
        t: 's',
        v: key,
      };
      worksheet[`B${height}`] = {
        t: 's',
        v: value,
      };
    });
  });
  worksheet['!ref'] = `A1:B${height}`;
  return worksheet;
}
function makeFormWorksheet (ws) {
  const worksheet = {};

  //findHeight
  const ref = ws['!ref'];
  const heightOfWs = parseInt(ref.slice(ref.indexOf('B') + 1, ref.length));

  //make form template ex) #1, #2..
  let objectNowIndex = 0; // #x
  let formHeight = 1;
  for(let i = 2; i<= heightOfWs; i += 1) {
    const label = ws[`A${i}`].v;
    if (label.indexOf('#') === 0) {
      objectNowIndex = label.slice(label.indexOf('#') + 1, label.length); // ex) #1, #2
      worksheet[`A${formHeight}`] = {
        t: 's',
        v: `#${objectNowIndex}`,
      };
    } else if (label.indexOf('data.text') === 0) {
      const value = ws[`B${i}`].v;
      worksheet[`B${formHeight}`] = {
        t: 's',
        v: value,
      };
      ws[`B${i}`].f = `Form!${`B${formHeight}`}`;
      formHeight += 1;
    }
  }
  worksheet['!ref'] = `A1:B${formHeight}`;
  return {
    Raw: ws,
    Form: worksheet,
  };
}
export default function (changeables = [], projectId = '') {
  const worksheet = makeBaseWorksheet(changeables.map(decompose), projectId);
  const { Raw, Form } = makeFormWorksheet(worksheet);
  const new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, Raw, "Raw");
  XLSX.utils.book_append_sheet(new_workbook, Form, "Form");
  XLSX.writeFile(new_workbook, 'data.xlsx', {
    type: 'string',
  })
}
