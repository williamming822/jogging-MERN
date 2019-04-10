import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import AuthRouter from './auth';
import saga from './auth/redux/saga';
import reducer from './auth/redux/reducer';
class Apps extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={AuthRouter} />
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
