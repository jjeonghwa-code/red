import {
  actions,
  get,
} from './actions';
import request from '../../../../../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* getRequest({ params }) {
  const { response, error } = yield call(
    request,
    `/api/project/${params.projectId}`,
  );
  if (response) yield put(get.success(params, response));
  else yield put(get.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], getRequest),
];
