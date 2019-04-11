import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { USER_LOGIN, USER_SIGNUP } from './constants';
import { userLoginFail, userLoginSuccess } from './actions';
import history from 'utils/history';

export function* userLoginRequest(action) {
  const body = {
    email: action.payload.email,
    password: action.payload.password,
  };
  try {
    const data = yield call(request, 'auth/login', 'POST', body);
    console.log("user data after login", data);
    yield put(userLoginSuccess(data));
  } catch (err) {
    yield put(userLoginFail(err));
  }
}

export function* userSignupRequest(action) {
  const body = {
    email: action.payload.email,
    password: action.payload.password,
    firstName: action.payload.firstname,
    lastName: action.payload.lastname,
  };
  try {
    const data = yield call(request, 'signup', 'POST', body);
    if (data) {
      console.log("user data after signup", data);
      history.replace('/login');
    }
  } catch (err) {
    history.replace('/signup');
  }
}

export default function* authSaga() {
  yield takeLatest(USER_LOGIN, userLoginRequest);
  yield takeLatest(USER_SIGNUP, userSignupRequest);
}
