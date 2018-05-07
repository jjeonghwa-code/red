import {
  actions,
  auth,
} from './actions';
import request from '../../modules/request';
import {
  getTokenFromCookie,
  removeSecondaryUserTokenFromCookie,
} from '../../modules/authHelper';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const token = getTokenFromCookie();
  if (!token) {
    yield put(auth.failure(params));
  }
  else {
    const { response } = yield call(
      request,
      '/api/account/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) yield put(auth.success(params, response));
    else yield put(auth.failure(params));
  }
}
export default [
  takeLatest(actions['REQUEST'], get),
];
