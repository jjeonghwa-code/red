import {
  actions,
  accountList,
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
    '/api/account/list',
  );
  if (response) yield put(accountList.success(params, response));
  else yield put(accountList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
