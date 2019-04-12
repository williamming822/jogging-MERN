import userSaga from '../users/redux/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([userSaga()]);
}
