import { combineReducers } from 'redux';
import loader from './loader/reducer';
import noticeDialog from './noticeDialog/reducer';
import user from './user/reducer';
import removeAccount from './removeAccount/reducer';
import login from './login/reducer';
import signUp from './signUp/reducer';
import messageBar from './messageBar/reducer';

export default combineReducers({
  loader,
  noticeDialog,
  user,
  removeAccount,
  login,
  signUp,
  messageBar,
});
