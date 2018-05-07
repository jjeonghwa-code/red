/* global RedEditorSDK */
import {
  actions,
  editor,
} from './actions';
import request from '../../../../modules/request';
import {
  EDITOR_TOKEN_ENDPOINT,
  ACCESS_TOKEN,
} from '../../../../redConfig';
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
  if (response) {
    const { token } = response;
    const { userId } = params;
    const Editor = new RedEditorSDK({
      userId,
      accessToken: token,
    });
    yield put(editor.success(params, {
      editor: Editor,
      token,
      userId,
    }));
  }
  else yield put(editor.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], get),
];
