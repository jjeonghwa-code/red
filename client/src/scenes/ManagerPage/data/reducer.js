import { combineReducers } from 'redux';
import franchiseeList from './franchiseeList/reducer';
import franchiseeLogin from './franchiseeLogin/reducer';
import editor from './editor/reducer';
import order from './order/reducer';

export default combineReducers({
  franchiseeList,
  franchiseeLogin,
  editor,
  order,
});
