// @flow
import '../styles/global.css';
import React from 'react';
import type { Node } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';
import SignIn from './signIn';
import Dashboard from './dashboard';
import history from './history';
import CreateAccount from './createAccount';
// import routes from '../routes';

let username = '';
let failed = 0;
let signupStatus: SignupStatus = 0;

const doSubmit = (_username, password) => {
  username = _username;

  axios
    .post('/login', {
      username,
      password,
    })
    .then(response => {
      console.log(response);
      history.push('/dashboard');
      return 0;
    })
    .catch(error => {
      console.log(error);
      failed = true; // Let SignIn know the account was not successful in logging in
      history.push('/');
    });
};

const sendSignupRequest = (user, pass) => {
  axios
    .post('/signup', {
      user,
      pass,
    })
    .then(response => {
      console.log(response);
      history.push('/');
      return 0;
    })
    .catch(error => {
      console.log(error);
      // something went wrong in creation of account.. handle
    });
};

const doSignup = (_username, pass1, pass2) => {
  console.log(pass1);
  console.log(pass2);
  if (pass1.localeCompare(pass2) !== 0) {
    console.log("passwords don't match");
    signupStatus = 1;
    history.push('/signup');
  } else {
    signupStatus = 0;
    sendSignupRequest(_username, pass1);
    history.push('/signup');
  }
};

const App = (): Node => (
  <Router history={history}>
    <div>
      <Route
        exact
        path="/"
        render={props => (
          <SignIn {...props} handleSubmit={doSubmit} data={failed} />
        )}
      />
      <Route
        path="/signup"
        render={props => (
          <CreateAccount
            {...props}
            handleSignup={doSignup}
            status={signupStatus}
          />
        )}
      />
      <Route
        path="/dashboard"
        render={props => <Dashboard {...props} user={username} />}
      />
    </div>
  </Router>
);

export default hot(module)(App);
