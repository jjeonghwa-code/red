import franchiseeList from './franchiseeList/saga';
import franchiseeLogin from './franchiseeLogin/saga';
import editor from './editor/saga';
import order from './order/saga';

export default [
  ...franchiseeList,
  ...franchiseeLogin,
  ...editor,
  ...order,
];
