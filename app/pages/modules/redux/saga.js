import userSaga from '../users/redux/saga';
import { all } from 'redux-saga/effects';
console.log("user saga", userSaga);
export default function* rootSaga() {
  yield all([userSaga()]);
}
console.log("root saga", rootSaga);
