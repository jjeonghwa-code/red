import XLSX from 'xlsx';
import path from 'path';

export default function (file) {
  return new Promise ((resolve, reject) => {
    if (!file) reject('파일이 없습니다.');
    const ext = path.extname(file.name);
    if (ext !== '.xlsx' && ext !== '.xls') {
      reject('엑셀 파일이 아닙니다.');
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const jsons = wb.SheetNames.map(name => (
        XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 })
      ));
      const parsed = {
        projectId: '',
        bases: [],
        views: [],
      };
      parsed.projectId = jsons[0][0][1];
      // jsons[0].forEach(o => {
      //   const reg = /^(?:#)([0-9]+)/g.exec(o);
      //   if (reg) {
      //     console.log(reg);
      //   }
      // });
      const forms = jsons[1][0].map((o, i) => (
        jsons[1].map((oo, ii) => jsons[1][ii][i])
      ));
      const inputData = forms.splice(1, forms.length);
      //forms: #1,#2...

      inputData.forEach(row => {
        const base = [];
        const view = {
          data: [],
          isConfirmed: false,
        };
        row.forEach((col, i) => {
          const baseItem = {};
          const viewItem = {};
          const startI = jsons[0].findIndex(j => j[0] === forms[0][i]) + 1;
          const endI = i === row.length - 1 ? jsons[0].length : jsons[0].findIndex(j => j[0] === forms[0][i+1]);
          for (let i = startI; i < endI; i += 1) {
            const [ label, value ] = jsons[0][i];
            const splitted = label.split('.');
            if (splitted.length === 1) {
              baseItem[splitted[0]] = value;
            } else {
              if (!baseItem[splitted[0]]) baseItem[splitted[0]] = {};
              baseItem[splitted[0]][splitted[1]] = value;

              if(splitted[0] === 'variable' && splitted[1] === 'id') {
                viewItem.id = value;
              }
              if(splitted[0] === 'variable' && splitted[1] === 'title') {
                viewItem.title = value;
              }
              if(splitted[0] === 'data' && splitted[1] === 'text') {
                baseItem[splitted[0]][splitted[1]] = col;
                viewItem.value = col;
              }
            }
          }
          base.push(baseItem);
          view.data.push(viewItem);
        });
        parsed.bases.push(base);
        parsed.views.push(view);
      });
      resolve(parsed);
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsArrayBuffer(file);
  });
};
