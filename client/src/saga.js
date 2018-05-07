import {
  all,
} from 'redux-saga/effects';
import saga from './data/saga';
import LandingPage from './scenes/LandingPage/saga';
import ManagerPage from './scenes/ManagerPage/saga';

export default function* rootSaga() {
  yield all([
    ...saga,
    ...LandingPage,
    ...ManagerPage,
  ]);
}
