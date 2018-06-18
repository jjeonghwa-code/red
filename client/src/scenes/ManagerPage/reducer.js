import { combineReducers } from 'redux';
import data from './data/reducer';
import AccountManager from './scenes/AccountManager/reducer';
import ProjectManager from './scenes/ProjectManager/reducer';
import OrderedManager from './scenes/OrderedManager/reducer';
import Editor from './scenes/Editor/reducer';

export default combineReducers({
  data,
  AccountManager,
  ProjectManager,
  OrderedManager,
  Editor,
});
