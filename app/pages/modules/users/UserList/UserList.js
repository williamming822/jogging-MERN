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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from 'components/pagination';
import Modal from 'components/Modal';
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
    isConfirm: false,
    showConfirm: false,
    deleteId: null,
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

  handleConfirm = () => {
    console.log("user is deleted");
    this.setState({showConfirm: false})
  }
  handleCancel = () => {
    this.setState({showConfirm: false});
  }
  handleRemove = (deleteId) => () => {
    this.setState({deleteId, showConfirm: true});
  }
  render() {
    const { classes, userList, isListLoading } = this.props;
    const { rowsPerPage, page, showConfirm } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, userList.size - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Modal
          isOpen={showConfirm}
          content={"Are you sure to delete this user?"}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell align="right">LastName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                    <TableCell align="center">
                      <Fab color="primary" aria-label="Edit" className={classes.fab}>
                        <Icon>edit_icon</Icon>
                      </Fab>
                      <Fab color="secondary" aria-label="Edit" onClick={this.handleRemove(user.get('_id'))} className={classes.fab}>
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
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
              <Fab color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
              </Fab>
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
