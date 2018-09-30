// @flow
import React from 'react';
import {
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const DisplayStatus = ({ status }: props) => {
  if (status !== null) {
    return (
      <Typography
        className="displayErrorSignup"
        variant="subheading"
        align="center"
        color="error"
      >
        {status}
      </Typography>
    );
  }
  return null;
};

class CreateAccount extends React.Component {
  state = {};

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePass1Change(e) {
    this.setState({ pass1: e.target.value });
  }

  handlePass2Change(e) {
    this.setState({ pass2: e.target.value });
  }

  render() {
    const { handleSignup, status } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className="paper">
          <Typography variant="headline" className="textCenter">
            Sign up
          </Typography>
          <form className="form">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.handleEmailChange(e)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.handlePass1Change(e)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <Input
                name="password2"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={e => this.handlePass2Change(e)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className="submit"
              onClick={e => {
                e.preventDefault(); // to prevent the form from refreshing every time.
                const { email, pass1, pass2 } = this.state;
                if (
                  email === undefined ||
                  pass1 === undefined ||
                  pass2 === undefined
                ) {
                  return;
                }
                handleSignup(email, pass1, pass2);
              }}
            >
              Sign Up
            </Button>
            <DisplayStatus status={status} />
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

CreateAccount.propTypes = {
  handleSignup: PropTypes.func,
  status: PropTypes.string,
};
CreateAccount.defaultProps = {
  handleSignup: () => {},
  status: null,
};

export default CreateAccount;
