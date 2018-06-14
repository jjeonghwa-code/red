import {
  actions,
  update,
} from './actions';
import {
  projectList,
} from '../projectList/actions';
import request from '../../../../../../modules/request';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import {select} from 'redux-saga/es/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    '/api/project',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  if (response) {
    const { auth } = (yield select()).data;
    yield put(projectList.request({ accountId: auth.response.id }));
    yield put(update.success(params, response));
  }
  else yield put(update.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
