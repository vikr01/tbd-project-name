// @flow
import React, { Component, Fragment } from 'react';
import {
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';

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

type Props = {
  handleSignup: Function,
  status: string,
};

export default class CreateAccount extends Component<Props> {
  props: Props;

  state = {
    accountType: '', // cannot be null as value of a Select cannot be null
  };

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
    const { accountType, hideAccountTypeLabel } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Paper className="paper">
          <Typography variant="headline" className="textCenter">
            Sign up
          </Typography>
          <form className="form">
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="account_type"
                disabled={hideAccountTypeLabel}
              >
                Account Type
              </InputLabel>
              <Select
                id="account_type"
                name="account_type"
                autoFocus
                value={accountType}
                onChange={e => {
                  console.log(e.target.value);
                  this.setState({
                    accountType: e.target.value,
                    hideAccountTypeLabel: e.target.value !== '',
                  });
                }}
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
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
                  pass2 === undefined ||
                  accountType === ''
                ) {
                  return;
                }
                handleSignup(email, pass1, pass2, accountType);
              }}
            >
              Sign Up
            </Button>
            <DisplayStatus status={status} />
          </form>
        </Paper>
      </Fragment>
    );
  }
}
