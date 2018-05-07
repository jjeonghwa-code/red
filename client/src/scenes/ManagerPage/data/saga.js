import franchiseeList from './franchiseeList/saga';
import franchiseeLogin from './franchiseeLogin/saga';
import editor from './editor/saga';

export default [
  ...franchiseeList,
  ...franchiseeLogin,
  ...editor,
];
