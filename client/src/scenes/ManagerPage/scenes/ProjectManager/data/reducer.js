import { combineReducers } from 'redux';
import projectList from './projectList/reducer';
import update from './update/reducer';
import remove from './remove/reducer';

export default combineReducers({
  projectList,
  update,
  remove,
});
