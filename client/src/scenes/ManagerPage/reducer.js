import { combineReducers } from 'redux';
import data from './data/reducer';
import AccountManager from './scenes/AccountManager/reducer';
import EditorManager from './scenes/EditorManager/reducer';
import CompletedManager from './scenes/CompletedManager/reducer';

export default combineReducers({
  data,
  AccountManager,
  EditorManager,
  CompletedManager,
});
