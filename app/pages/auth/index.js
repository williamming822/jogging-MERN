import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './login';
import Signup from './signup';

const AuthRouter = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signup" component={Signup} />
  </Switch>
);

export default withRouter(AuthRouter);
