import {
  actions,
  orderedList,
} from './actions';
import request from '../../../../../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/project/orderedList',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) yield put(orderedList.success(params, response));
  else yield put(orderedList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
