import { combineReducers } from 'redux';
import loader from './loader/reducer';
import messageBar from './messageBar/reducer';
import auth from './auth/reducer';
import language from './language/reducer';

export default combineReducers({
  loader,
  messageBar,
  auth,
  language,
});
