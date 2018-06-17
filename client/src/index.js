import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store, { history } from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!window.Promise) {
  window.Promise = Promise;
} // Promise explorer 호환
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3e4553',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f08080',
      main: '#F46161',
      dark: '#e91b23',
      contrastText: '#fff',
    },
  },
});
injectTapEventPlugin();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
