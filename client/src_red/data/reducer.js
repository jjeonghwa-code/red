import { combineReducers } from 'redux';
import loader from './loader/reducer';
import editorToken from './editorToken/reducer';

export default combineReducers({
  loader,
  editorToken,
});
