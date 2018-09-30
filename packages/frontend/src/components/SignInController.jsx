// @flow
import '../styles/global.css';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:2000',
});

class SignInController extends React.Component {
  state = {
    status: null,
    signupStatus: null,
  };

  async doSubmit(username, password) {
    try {
      const res = await axiosClient.post('/login', {
        username,
        password,
      });
      console.log(res);
      this.setState({ status: 'Logging in' });
    } catch (error) {
      console.log(error);
      this.setState({ status: 'Unable to connect to server...' }); // Let SignIn know the account was not successful in logging in
      // history.push('/');
    }
  }

  sendSignupRequest = async (user, pass) => {
    try {
      const res = await axios.post('/signup', {
        user,
        pass,
      });
      console.log(res); // check if data is a success
      if (res.succcess) {
        this.setState({ signupStatus: 'ok' });
      } else {
        this.setState({ signupStatus: res.error });
      }
    } catch (e) {
      this.setState({ signupStatus: 'unable to connect to server...' });
    }
  };

  doSignup = (username, pass1, pass2) => {
    console.log(pass1);
    console.log(pass2);
    if (pass1.localeCompare(pass2) !== 0) {
      this.setState({ signupStatus: "passwords don't match" });
    } else {
      this.sendSignupRequest(username, pass1);
    }
  };

  render() {
    const { status, signupStatus } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            status === 'ok' ? (
              <Redirect to="/dashboard" />
            ) : (
              <SignIn
                {...props}
                handleSubmit={() => this.doSubmit()}
                status={status}
              />
            )
          }
        />
        <Route
          path="/signup"
          render={props =>
            signupStatus === 'ok' ? (
              <Redirect to="/" />
            ) : (
              <CreateAccount
                {...props}
                handleSignup={this.doSignup}
                status={signupStatus}
              />
            )
          }
        />
      </Switch>
    );
  }
}

export default hot(module)(SignInController);
