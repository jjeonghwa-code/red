import {
  actions,
  printList,
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
    '/api/print/list',
  );
  if (response) yield put(printList.success(params, response));
  else yield put(printList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
