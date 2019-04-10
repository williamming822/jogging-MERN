import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { USER_LOGIN } from './constants';
import { userLoginFail, userLoginSuccess } from './actions';

export function* userLoginRequest(action) {
  const body = {
    email: action.payload.email,
    password: action.payload.passowrd,
  };
  const requestURL = `api/login`;
  try {
    const user = yield call(request, requestURL, 'POST', body);
    yield put(userLoginSuccess);
  } catch (err) {
    yield put(userLoginFail(err));
  }
}

export default function* authSaga() {
  yield takeLatest(USER_LOGIN, userLoginRequest);
}
