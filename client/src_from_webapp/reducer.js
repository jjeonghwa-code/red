import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data/reducer';
import main from './scenes/Main/reducer';

export default combineReducers({
  routing: routerReducer,
  data,
  main,
});
