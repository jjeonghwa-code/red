import {
  actions,
  completedList,
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
    '/api/print/completedList',
  );
  if (response) yield put(completedList.success(params, response));
  else yield put(completedList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
