import { combineReducers } from 'redux';
import franchiseeList from './franchiseeList/reducer';
import franchiseeLogin from './franchiseeLogin/reducer';
import editor from './editor/reducer';

export default combineReducers({
  franchiseeList,
  franchiseeLogin,
  editor,
});
