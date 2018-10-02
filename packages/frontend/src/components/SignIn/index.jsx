// @flow
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Prompt from './Prompt';
import CreateAccount from '../CreateAccount';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:2000',
});

const signinStatusEnums = {
  ok: 0,
  connection_error: 1,
  invalid_credentials: 2,
  default: 3,
};

function signinStatusToString(e: signinStatusEnums): string {
  switch (e) {
    case signinStatusEnums.ok:
      return 'Logging in...';
    case signinStatusEnums.connection_error:
      return 'Unable to connect to server.';
    case signinStatusEnums.invalid_credentials:
      return 'Invaild username or password.';
    default:
      return null;
  }
}

const signupStatusEnums = {
  ok: 0,
  connection_error: 1,
  password_mismatch: 2,
  username_taken: 3,
  default: 4,
};

function signupStatusToString(e: signupStatusEnums): string {
  switch (e) {
    case signupStatusEnums.ok:
      return 'Success, redirecting to login page...';
    case signupStatusEnums.connection_error:
      return 'Unable to connect to server.';
    case signupStatusEnums.password_mismatch:
      return 'Password comfirmation is not matching.';
    case signupStatusEnums.username_taken:
      return 'Username has already been taken.';
    default:
      return null;
  }
}

export default class SignInController extends Component {
  state = {
    signinStatus: signinStatusEnums.default,
    signupStatus: signupStatusEnums.default,
  };

  doSubmit = async (username, password) => {
    let response;
    try {
      response = await axiosClient.post('/authenticate', {
        username,
        password,
      });
    } catch (error) {
      console.error(error);
      this.setState({ signinStatus: signinStatusEnums.connection_error }); // Let SignIn know the account was not successful in logging in
      return;
    }
    console.log(response);
    this.setState({ signinStatus: signinStatusEnums.ok });
  };

  sendSignupRequest = async (user, pass, accountType) => {
    let response;
    try {
      response = await axiosClient.post('/signup', {
        user,
        pass,
        accountType,
      });
    } catch (e) {
      this.setState({ signupStatus: signupStatusEnums.connection_error });
      return;
    }

    console.log(response); // check if data is a success
    if (response.succcess) {
      this.setState({ signupStatus: signupStatusEnums.ok });
    } else {
      // username must be taken
      this.setState({ signupStatus: signupStatusEnums.username_taken });
    }
  };

  doSignup = (username, pass1, pass2, accountType) => {
    if (pass1.localeCompare(pass2) !== 0) {
      this.setState({ signupStatus: signupStatusEnums.password_mismatch });
    } else {
      this.sendSignupRequest(username, pass1, accountType);
    }
  };

  render() {
    const { signinStatus, signupStatus } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            signinStatus === signinStatus.ok ? (
              <Redirect to="/dashboard" />
            ) : (
              <Prompt
                {...props}
                handleSubmit={this.doSubmit}
                status={signinStatusToString(signinStatus)}
              />
            )
          }
        />
        <Route
          path="/signup"
          render={props =>
            signupStatus === signupStatusEnums.ok ? (
              <Redirect to="/" />
            ) : (
              <CreateAccount
                {...props}
                handleSignup={this.doSignup}
                status={signupStatusToString(signupStatus)}
              />
            )
          }
        />
      </Switch>
    );
  }
}
