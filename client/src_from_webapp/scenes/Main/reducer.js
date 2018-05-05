import { combineReducers } from 'redux';
import data from './data/reducer';
import addApp from './scenes/AddApp/reducer';
import appList from './scenes/AppList/reducer';
import myApp from './scenes/MyApp/reducer';

export default combineReducers({
  data,
  addApp,
  appList,
  myApp,
});
