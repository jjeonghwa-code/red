import { push } from 'react-router-redux';
import {
  actions,
  order,
} from './actions';
import request from '../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/project/order',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(push('/ordered'));
    yield put(order.success(params, response));
  }
  else yield put(order.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
