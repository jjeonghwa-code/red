import {
  actions,
  d1,
} from './actions';
import request from '../../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/d1/',
    {
      headers: {
        Authorization: `Bearer `,
      },
    });
  if (response) yield put(d1.success(params, response));
  else yield put(d1.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
