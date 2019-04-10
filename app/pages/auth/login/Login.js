import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { userLogin } from '../redux/actions';
import { makeSelectCurrentUser, makeSelectError } from '../redux/selectors';

function Login(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    classes,
  } = props;
  console.log(props);
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email &&
              touched.email && <div id="emailError">{errors.email}</div>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={values.password}
              onBlur={handleBlur}
              autoComplete="current-password"
              onChange={handleChange}
            />
            {errors.password &&
              touched.password && (
              <div id="passwordError">{errors.password}</div>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          className={classes.submit}
          to="/signup"
        >
          Signup
        </Button>
      </Paper>
    </main>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  error: makeSelectError(),
});
const mapDispatchToProps = {
  userLogin,
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withMyFormik = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    props.userLogin({ ...values });
    setSubmitting(false);
  },

  displayName: 'LoginForm',
});

export default compose(
  withConnect,
  withRouter,
  withStyles(styles),
  withMyFormik,
)(Login);
