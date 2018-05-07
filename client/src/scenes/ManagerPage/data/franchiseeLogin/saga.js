import {
  actions,
  franchiseeLogin,
} from './actions';
import request from '../../../../modules/request';
import {
  getSecondaryUserTokenFromCookie,
  setSecondaryUserTokenToCookie,
  removeSecondaryUserTokenFromCookie,
} from '../../../../modules/authHelper';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* req({ params }) {
  const { response, error } = yield call(
    request,
    '/api/account/franchiseeLogin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    setSecondaryUserTokenToCookie(response.id);
    yield put(franchiseeLogin.success(params, response));
  }
  else {
    removeSecondaryUserTokenFromCookie();
    yield put(franchiseeLogin.failure(params));
  }
}
export default [
  takeLatest(actions['REQUEST'], req),
];
