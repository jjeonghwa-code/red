import { combineReducers } from 'redux';
import setMyApp from './setMyApp/reducer';
import addMyApp from './addMyApp/reducer';
import removeMyApp from './removeMyApp/reducer';
import app from './app/reducer';

export default combineReducers({
  setMyApp,
  addMyApp,
  removeMyApp,
  app,
});
