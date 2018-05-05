import {
  actions,
  auth,
} from './actions';
import request from '../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/account/',
  );
  if (response) yield put(auth.success(params, response));
  else yield put(auth.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
