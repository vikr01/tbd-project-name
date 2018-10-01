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

const CheckStatus = ({ status }: props) =>
  status ? (
    <Typography
      className="displayErrorSignup"
      variant="subheading"
      align="center"
      color="error"
    >
      {status}
    </Typography>
  ) : null;

const SignInEmailInput = () => (
  <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="email">Email Address</InputLabel>
    <Input id="email" name="email" autoComplete="email" autoFocus />
  </FormControl>
);

const SignInPasswordInput = () => (
  <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="password">Password</InputLabel>
    <Input
      name="password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
  </FormControl>
);

const SignInButton = () => (
  <Button
    type="submit"
    fullWidth
    variant="raised"
    color="primary"
    className="submit"
  >
    Sign in
  </Button>
);
const SignIn = ({ handleSubmit, status }: props) => (
  <Fragment>
    <CssBaseline />
    <Paper className="paper">
      <img src={logo} className="logo" alt="logo" />
      <Typography variant="headline" align="center">
        Sign in
      </Typography>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          const user = e.target.elements.email.value;
          const pass = e.target.elements.password.value;
          handleSubmit(user, pass);
        }}
      >
        <SignInEmailInput />
        <SignInPasswordInput />
        <SignInButton />
        <CheckStatus status={status} />
        <Link to="/signup" className="signup">
          Create Account
        </Link>
      </form>
    </Paper>
  </Fragment>
);

export default SignIn;
