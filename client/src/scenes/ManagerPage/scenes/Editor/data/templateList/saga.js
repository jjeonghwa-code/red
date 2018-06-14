import {
  actions,
  templateList,
} from './actions';
import request from '../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* post({ params }) {
  const { editor, code, option } = params;
  const { response, error } = yield call(
    request,
    editor.getTemplateList,
    code,
    option,
  );
  if (response) yield put(templateList.success(params, response));
  else yield put(templateList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], post),
];
