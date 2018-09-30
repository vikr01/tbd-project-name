// @flow
import React, { Fragment } from 'react';
import {
  InputLabel,
  Paper,
  Typography,
  Input,
  FormControl,
  CssBaseline,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

const CheckStatus = ({ status }: props) => {
  if (status !== null) {
    return (
      <Typography variant="headline" align="center">
        {status}
      </Typography>
    );
  }
  return null;
};

const SignIn = ({ handleSubmit, status }: props) => (
  <Fragment>
    <CssBaseline />
    <Paper className="paper">
      <img src={logo} className="logo" alt="logo" />
      <Typography variant="headline" align="center">
        Sign in
      </Typography>
      <form className="form">
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" autoComplete="email" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="raised"
          color="primary"
          className="submit"
          onClick={e => {
            e.preventDefault();
            const user = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            handleSubmit(user, pass);
          }}
        >
          Sign in
        </Button>
        <CheckStatus status={status} />
        <Link to="/signup" className="signup">
          Create Account
        </Link>
      </form>
    </Paper>
  </Fragment>
);

export default SignIn;
