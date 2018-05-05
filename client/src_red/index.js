import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!window.Promise) {
  window.Promise = Promise;
} // Promise explorer 호환

injectTapEventPlugin();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
