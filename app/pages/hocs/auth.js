import React from 'react'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { USER_LOGIN } from './auth/redux/constants'

export const isAdmin = (currentUser) => currentUser.role === 'admin'
export const isManager = (currentUser) => currentUser.role === 'manager'
export const isRegular = (currentUser) => currentUser.role === 'user'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.currentUser !== null,
  authenticatingSelector: state => state.auth.loading,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: (<div>Siging you in ...</div>),
  redirectPath: '/login'
})

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.currentUser === null,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
})

export const userIsAdminOrRegular = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.currentUser !== null &&
    (isAdmin(state.auth.currentUser) || isRegular(state.auth.currentUser)),
  predicate: user => isAdmin(user) || isRegular(user),
  wrapperDisplayName: 'UserIsAdminOrRegular'
})

export const userIsAdminOrManager = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.currentUser !== null &&
    (isAdmin(state.auth.currentUser) || isManager(state.auth.currentUser)),
  predicate: user => isAdmin(user) || isManager(user),
  wrapperDisplayName: 'UserIsAdminOrManager'
})
