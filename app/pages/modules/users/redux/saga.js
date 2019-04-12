import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USERS, GET_USER, DELETE_USER, SAVE_USER } from './constants';
import {
  getUsersFail,
  getUsersSuccess,
  getUserFail,
  getUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
  saveUserFail,
  saveUserSuccess,
} from './actions';
import history from 'utils/history';

export function* getUsersRequest(action) {
  try {
    const data = yield call(request, 'users', 'GET', null, true);
    yield put(getUsersSuccess(data));
  } catch (err) {
    yield put(getUsersFail(err));
  }
}

export function* getUserRequest(action) {
  try {
    const data = yield call(request, `users/${action.payload}`, 'GET', null, true);
    yield put(getUserSuccess(data));
  } catch (err) {
    yield put(getUserFail(err));
  }
}

export function* deleteUserRequest(action) {
  try {
    const data = yield call(request, `users/${action.payload.id}`, 'DELETE', null, true);
    console.log("user lists", data);
    yield put(deleteUserSuccess(data));
  } catch (err) {
    yield put(deleteUserFail(err));
  }
}

export function* saveUserRequest(action) {
  console.log(action);
  try {
    // const state = yield select();
    // const user = selectUser(state);
    // const requestData = user.get('user').get('data').toJS();
    // const id = user.get('user').get('id');
    // let responseData = null;
    let id = action.payload._id;
    if (!id) {
      responseData = yield call(request, 'users', 'POST', { ...action.payload }, true);
    } else {
      responseData = yield call(request, `users/${id}`, 'PUT', { ...action.payload }, true);
    }

    yield put(saveUserSuccess(responseData));
    notify.success('User saved');
  } catch (err) {
    yield put(saveUserFail(err));
  }

}

export default function* userSaga() {
  yield takeLatest(GET_USERS, getUsersRequest);
  yield takeLatest(GET_USER, getUserRequest);
  yield takeLatest(DELETE_USER, deleteUserRequest);
  yield takeLatest(SAVE_USER, saveUserRequest);
}
