import {
  actions,
  editorToken,
} from './actions';
import request from '../../modules/request';
import {
  EDITOR_TOKEN_ENDPOINT,
  ACCESS_TOKEN,
} from '../../redConfig';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* get({ params }) {
  const { response, error } = yield call(
    request,
    EDITOR_TOKEN_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  if (response) yield put(editorToken.success(params, response));
  else yield put(editorToken.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
