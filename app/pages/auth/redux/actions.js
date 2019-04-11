import { createAction } from 'redux-actions';
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT,
} from './constants';

export const userLogin = createAction(USER_LOGIN);
export const userLoginSuccess = createAction(USER_LOGIN_SUCCESS);
export const userLoginFail = createAction(USER_LOGIN_FAIL);

export const userSignup = createAction(USER_SIGNUP);
export const userSignupSuccess = createAction(USER_LOGIN_SUCCESS);
export const userSignupFail = createAction(USER_LOGIN_FAIL);

export const userLogout = createAction(USER_LOGOUT);
