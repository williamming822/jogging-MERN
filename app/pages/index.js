import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
//utils provided from 'boilerplate'
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './auth/redux/saga';
import reducer from './auth/redux/reducer';
//user component to use
import AuthRouter from './auth';
import UserList from './users/UserList';

class Apps extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={AuthRouter} />
        <Route path="/users" component={UserList} />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
)(Apps);
