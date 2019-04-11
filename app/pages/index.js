import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// utils provided from 'boilerplate'
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './auth/redux/saga';
import reducer from './auth/redux/reducer';
// user component to use
import AuthRouter from './auth';
import ModuleRouter from './modules';
import { makeSelectCurrentUser } from './auth/redux/selectors';
import { makeSelectPersistLoaded } from './redux/selectors';

class Apps extends Component {
  renderApp = () => {
    const { currentUser } = this.props;
    console.log("currentUser", currentUser );
    return currentUser ? <ModuleRouter /> : <AuthRouter />;
  }
  render() {
    const { persistLoaded } = this.props;
    if (!persistLoaded) {
      return null;
    }
    return (
      <Switch>
        <Route path="/" render={this.renderApp} />
      </Switch>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  persistLoaded: makeSelectPersistLoaded(),
});

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });
const withConnect = connect(mapStateToProps);

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect
)(Apps));
