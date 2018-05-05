import {
  all,
} from 'redux-saga/effects';
import saga from './data/saga';

export default function* rootSaga() {
  yield all([
    ...saga,
  ]);
}
