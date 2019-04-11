import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
//extra user defined helpers
import { makeSelectCurrentUser } from '../auth/redux/selectors';
import Grid from '@material-ui/core/Grid';
import reducer from './redux/reducer';
import saga from './redux/saga';
import UserList from './users/UserList';
import UserDetail from './users/UserDetail';
import WeeklyReport from './entry/ReportPage';
import EntryList from './entry/EntryList';
import TopBar from 'components/TopBar';

class ModuleRotuer extends Component {
  adminRoutes() {
    return (
      <Switch>
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/entries" component={EntryList} />
        <Route exact path="/report" component={WeeklyReport} />
        <Route exact path="/entries/:id" component={EntryList} />
        <Route render={() => <Redirect to="/users" />} />
      </Switch>
    );
  }

  userRoutes() {
    return (
      <Switch>
        <Route exact path="/entries" component={EntryList} />
        <Route exact path="/report" component={WeeklyReport} />
        <Route exact path="/entries/:id" component={EntryList} />
        <Route render={() => <Redirect to="/entries" />} />
      </Switch>
    );
  }

  managerRoutes() {
    return (
      <Switch>
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route render={() => <Redirect to="/users" />} />
      </Switch>
    );
  }

  render() {
    const { currentUser } = this.props;
    console.log("Current User in module", currentUser);
    return (
      <Grid container>
        <TopBar />
        {this[`${currentUser.get('role')}Routes`]()}
      </Grid>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(ModuleRotuer));
