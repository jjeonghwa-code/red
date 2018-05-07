import { combineReducers } from 'redux';
import accountList from './accountList/reducer';
import accountCreate from './accountCreate/reducer';
import accountRemove from './accountRemove/reducer';
import accountUpdate from './accountUpdate/reducer';

export default combineReducers({
  accountList,
  accountCreate,
  accountRemove,
  accountUpdate,
});
