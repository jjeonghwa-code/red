import {
  actions,
  productList,
} from './actions';
import request from '../../modules/request';

import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

function* post({ params }) {
  const { editor } = params;
  const { response, error } = yield call(
    request,
    editor.getProductList,
    params,
  );
  if (response) yield put(productList.success(params, response));
  else yield put(productList.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], post),
];
