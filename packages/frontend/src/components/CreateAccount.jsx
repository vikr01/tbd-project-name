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

const SignUpEmailForm = () => (
  <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="email">Email Address</InputLabel>
    <Input id="email" name="email" autoComplete="email" />
  </FormControl>
);

const SignUpPasswordForm = ({ name, value }: props) => (
  <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor={name}>{value}</InputLabel>
    <Input
      name={name}
      type="password"
      id={name}
      autoComplete="current-password"
    />
  </FormControl>
);

type Props = {
  handleSignup: Function,
  status: string,
};

export default class CreateAccount extends Component<Props> {
  props: Props;

  state = {
    accountType: '', // cannot be null as value of a Select cannot be null
  };

  onSubmit(e, handleSignup) {
    const { accountType } = this.state;
    e.preventDefault(); // to prevent the form from refreshing every time.
    const elem = e.target.elements;
    const email = elem.email.value;
    const pass1 = elem.password.value;
    const pass2 = elem.password2.value;
    if (
      email === undefined ||
      pass1 === undefined ||
      pass2 === undefined ||
      accountType === ''
    ) {
      return;
    }
    handleSignup(email, pass1, pass2, accountType);
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
          <form
            className="form"
            onSubmit={e => {
              this.onSubmit(e, handleSignup);
            }}
          >
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
            <SignUpEmailForm />
            <SignUpPasswordForm name="password" value="Password" />
            <SignUpPasswordForm name="password2" value="Confirm Password" />
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className="submit"
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
