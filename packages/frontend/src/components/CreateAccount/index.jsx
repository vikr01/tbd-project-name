// @flow
import React, { Component, Fragment } from 'react';
import {
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import type { Node } from 'react';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import DisplayStatus from '../DisplayStatus';

type Props = {
  handleSignup: Function,
  status: string,
};

export default class CreateAccount extends Component<Props> {
  props: Props;

  state = {
    accountType: '', // cannot be null as value of a Select cannot be null
  };

  onSubmit = e => {
    e.preventDefault();
    const { handleSignup } = this.props;
    const { accountType } = this.state;
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
  };

  render(): Node {
    const { status } = this.props;
    const { accountType, hideAccountTypeLabel } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Paper className="paper">
          <Typography variant="headline" className="textCenter">
            Sign up
          </Typography>
          <form className="form" onSubmit={this.onSubmit}>
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
            <EmailForm />
            <PasswordForm name="password" value="Password" />
            <PasswordForm name="password2" value="Confirm Password" />
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
