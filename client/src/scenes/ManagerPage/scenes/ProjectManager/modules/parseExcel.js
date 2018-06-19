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

      let titles = [];
      let forms = [];//jsons[1];
      jsons.forEach((page, p) => {
        if (p > 0) {
          titles = titles.concat(page.map(o => ({
            page: String(p - 1),
            value: o[0],
          })));
          forms = forms.concat(page.map(o => o.slice(1, o.length)));
        }
      });
      forms = forms[0].map((o, i) => (
        forms.map((oo, ii) => forms[ii][i])
      ));
      const idMap = [];

      const keys = jsons[0].map(o => o[0]);

      let startI = 0;
      let endI = 0;
      let foundI = keys.indexOf('variable.title', endI);
      let map = {};
      while(foundI > -1){
        startI = foundI - 1;
        endI = foundI + 1;
        while (startI >= 0 && jsons[0][startI].length !== 1) {
          startI -= 1;
        }
        while (endI < jsons[0].length && jsons[0][endI].length !== 1) {
          endI += 1;
        }
        for (let i = startI + 1; i < endI; i += 1) {
          const [label, value] = jsons[0][i];
          const splitted = label.split('.');
          if (splitted[0] === 'path' && splitted[1] === 'page_index') {
            map.page = value;
          }
          if (splitted[0] === 'variable' && splitted[1] === 'id') {
            map.id = value;
          }
          if (splitted[0] === 'variable' && splitted[1] === 'title') {
            map.title = value;
          }
        }
        idMap.push(map);
        map = {};
        foundI = keys.indexOf('variable.title', endI);
      }

      forms.forEach(row => {
        const base = [];
        const view = {
          data: [],
          isConfirmed: false,
        };
        row.forEach((col, i) => {
          const title = titles[i];
          const baseItem = {};
          const viewItem = {
            title: title.value,
            value: col,
          };
          const map = idMap.find(o => o.title === title.value && o.page === title.page);
          viewItem.id = map.id;
          viewItem.page = map.page;

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
