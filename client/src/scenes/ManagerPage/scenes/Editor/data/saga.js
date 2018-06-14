import save from './save/saga';
import productList from './productList/saga';
import templateList from './templateList/saga';
import get from './get/saga';

export default [
  ...save,
  ...productList,
  ...templateList,
  ...get,
];
