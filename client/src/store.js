/* global window */
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [
  sagaMiddleware,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);
store.close = () => store.dispatch(END);

export default store;
