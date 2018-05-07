import {
  actions,
  accountUpdate,
} from './actions';
import {
  accountList,
} from '../accountList/actions';
import request from '../../../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/account',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    yield put(accountList.request());
    yield put(accountUpdate.success(params, response));
  }
  else yield put(accountUpdate.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
