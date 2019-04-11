import React from 'react';
import PropTypes from 'prop-types';
/* HOCs from libraries */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
/* material ui components imports */
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from 'components/pagination';
import { styles } from './styles';
/* import selectors and actions*/
import {
  makeSelectUserList,
  makeSelectUserListLoading,
  makeSelectUser,
  makeSelectUserLoading
} from '../redux/selectors';
import { getUsers } from '../redux/actions';

class UserList extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  componentWillMount() {
    this.props.getUsers();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes, userList, isListLoading } = this.props;
    console.log("Props of UserList +++++++++++++", this.props);
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, userList.size - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell align="right">LastName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRow key={user.get('_id')}>
                    <TableCell component="th" scope="row">
                      {user.get('firstName')}
                    </TableCell>
                    <TableCell align="right">{user.get('lastName')}</TableCell>
                    <TableCell align="right">{user.get('email')}</TableCell>
                    <TableCell align="right">{user.get('role')}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
              <Pagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={userList.size}
                rowsPerPage={+rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              </TableRow>
            </TableFooter>

          </Table>
        </div>
      </Paper>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
  isListLoading: makeSelectUserListLoading(),
  user: makeSelectUser(),
  isUserLoading: makeSelectUserLoading(),
});
const mapDispatchToProps = {
  getUsers: getUsers,
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withStyles(styles),
)(UserList);
