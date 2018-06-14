import { combineReducers } from 'redux';
import save from './save/reducer';
import productList from './productList/reducer';
import templateList from './templateList/reducer';
import get from './get/reducer';

export default combineReducers({
  save,
  productList,
  templateList,
  get,
});
