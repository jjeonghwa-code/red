import { combineReducers } from 'redux';
import urlInfo from './urlInfo/reducer';
import add from './add/reducer';

export default combineReducers({
  urlInfo,
  add,
});
