import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USERS } from './constants';
import { getUsersFail, getUsersSuccess } from './actions';
import history from 'utils/history';

export function* getUsersRequest(action) {
  try {
    const data = yield call(request, 'users', 'GET', null, true);
    console.log("user lists", data);
    yield put(getUsersSuccess(data));
  } catch (err) {
    yield put(getUsersFail(err));
  }
}

export default function* userSaga() {
  yield takeLatest(GET_USERS, getUsersRequest);
}
