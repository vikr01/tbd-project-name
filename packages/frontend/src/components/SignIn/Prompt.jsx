// @flow
import React, { Fragment } from 'react';
import { CssBaseline, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import type { Node } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ConfirmButton from './ConfirmButton';
import CheckStatus from '../CheckStatus';
import logo from '../../images/logo.png';

type Props = {
  handleSubmit: Function,
};

const SignIn = ({ handleSubmit }: Props): Node => (
  <Fragment>
    <CssBaseline />
    <Paper className="paper">
      <img src={logo} className="logo" alt="logo" />
      <Typography variant="headline" align="center">
        Sign in
      </Typography>
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          const user = event.target.elements.email.value;
          const pass = event.target.elements.password.value;
          handleSubmit(user, pass);
        }}
      >
        <EmailInput />
        <PasswordInput />
        <ConfirmButton />
        <CheckStatus />
        <Link to="/signup" className="signup">
          Create Account
        </Link>
      </form>
    </Paper>
  </Fragment>
);

export default SignIn;
