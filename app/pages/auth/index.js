import React, { Component } from 'react';
import { compose } from 'redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './redux/saga';
import reducer from './redux/reducer';

const AuthRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route render={() => <Redirect to="/login" />} />
  </Switch>
);

export default compose(
  withRouter,
)(AuthRouter);
