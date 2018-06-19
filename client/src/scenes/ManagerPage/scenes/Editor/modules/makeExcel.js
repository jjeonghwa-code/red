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
  const forms = [];

  //findHeight
  const ref = ws['!ref'];
  const heightOfWs = parseInt(ref.slice(ref.indexOf('B') + 1, ref.length));

  //make form template ex) #1, #2..
  let page = 0;
  for (let i = 2; i<= heightOfWs; i += 1) {
    const label = ws[`A${i}`].v;
    const page_index_i = label.indexOf('path.page_index');
    if (page_index_i === 0) {
      page = ws[`B${i}`].v;
    } else if (label.indexOf('variable.title') === 0) {
      forms[page] = forms[page] || [];
      forms[page].push([ws[`B${i}`].v]);
    }
  }
  return {
    Raw: ws,
    Forms: forms.map(XLSX.utils.aoa_to_sheet),
  }
}
export default function (changeables = [], projectId = '') {
  const worksheet = makeBaseWorksheet(changeables.map(decompose), projectId);
  const { Raw, Forms } = makeFormWorksheet(worksheet);
  const new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, Raw, "Raw");
  Forms.forEach((o, i) => (
    XLSX.utils.book_append_sheet(new_workbook, o, `Page${i+1}`)
  ));

  XLSX.writeFile(new_workbook, 'data.xlsx', {
    type: 'string',
  })
}
