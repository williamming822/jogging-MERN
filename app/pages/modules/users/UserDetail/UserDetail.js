import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getUser, saveUser, deleteUser } from '../redux/actions';
import { makeSelectUser } from '../redux/selectors';
import { withFormik } from 'formik';
import { isEmpty } from 'lodash';

class UserDetail extends Component {
  componentWillMount() {
    const { getUser, match } = this.props;
    if (match.params.id !== 'new') {
      getUser(match.params.id);
    }
  }

  handleSubmitClick = () => {
    const { errors, saveUser, values } = this.props;
    console.log("errrors", errors);
    if (isEmpty(errors)) {
      saveUser({...values});
    }
  }
  render() {
    const {
      classes,
      selectedUser,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      match,
    } = this.props;

    return (
      <main className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            { match.params.id === "new" ? "New User" : "Edit User" }
          </Typography>
          <Grid container spacing={24}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstName">FirstName</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={values.firstName || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.firstName &&
                  touched.firstName && <div id="firstNameError">{errors.firstName}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">LastName</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={values.lastName || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.lastName &&
                  touched.lastName && <div id="lastNameError">{errors.lastName}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={values.email || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email &&
                  touched.email && <div id="emailError">{errors.email}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  value={values.password || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.password &&
                  touched.password && <div id="passwordError">{errors.password}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Input
                  id="role"
                  name="role"
                  autoComplete="role"
                  value={values.role || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.role &&
                  touched.role && <div id="roleError">{errors.role}</div>}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
              Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/users"
                className={classes.button}
              >
              Cancel
              </Button>
            </Grid>
          </form>
          </Grid>
        </Paper>
      </main>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  selectedUser: makeSelectUser(),
});
const mapDispatchToProps = {
  getUser,
  saveUser,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withMyFormik = withFormik({
  mapPropsToValues: ({ selectedUser }) => {
    let { data } = selectedUser.toJS();
    if (!isEmpty(data)) {
      let value = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      };
      return value;
    }
  },

  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }

    if (!values.role) {
      errors.role = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    console.log("values", values, props);
    props.saveUser({ ...values });
    setSubmitting(false);
  },
  enableReinitialize: true,
  displayName: 'UserDetail',
});

export default withRouter(compose(
  withConnect,
  withStyles(styles),
  withMyFormik,
)(UserDetail));
