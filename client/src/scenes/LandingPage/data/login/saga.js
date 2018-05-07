import {
  actions,
  login,
} from './actions';
import { auth } from '../../../../data/auth/actions';
import request from '../../../../modules/request';
import {
  setUserTokenToCookie,
} from '../../../../modules/authHelper';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* req({ params }) {
  const { response, error } = yield call(
    request,
    '/api/account/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    setUserTokenToCookie(response.id);
    yield put(login.success(params, response));
    yield put(auth.request())
  }
  else yield put(login.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], req),
];
