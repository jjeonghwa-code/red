import { combineReducers } from 'redux';
import data from './data/reducer';
import AccountManager from './scenes/AccountManager/reducer';
import ProjectManager from './scenes/ProjectManager/reducer';
import CompletedManager from './scenes/CompletedManager/reducer';
import Editor from './scenes/Editor/reducer';

export default combineReducers({
  data,
  AccountManager,
  ProjectManager,
  CompletedManager,
  Editor,
});
