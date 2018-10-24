// @flow
import React, { Component, Fragment } from 'react';
import { Button, CssBaseline, Paper, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PasswordForm from '../../../CreateAccount/PasswordForm';
import DisplayStatus from '../../../DisplayStatus';
import routes from '../../../../routes';

type Props = {
  status: string,
};

function cardOk(card: string) {
  return true;
}

export default class CreditCardAdd extends Component<Props> {
  state = {
    redirect: false,
  };

  sendToBackend = card => {
    console.log('sending card to backend', card);
    alert('we got your card saved!');
    this.setState({ redirect: true });
  };

  onSubmit = event => {
    event.preventDefault();
    const { elements: elem } = event.target;
    console.log(event);
    const { value: card } = elem.card;

    if (!cardOk(card)) {
      return;
    }

    this.sendToBackend(card);
  };

  render() {
    const { status } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect push to={routes.DASHBOARD} />;
    }
    return (
      <Fragment>
        <CssBaseline />
        <Paper className="paper">
          <Typography variant="headline" className="textCenter">
            Add Credit card
          </Typography>
          <form className="form" onSubmit={this.onSubmit}>
            <PasswordForm name="card" value="Credit card number" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Add
            </Button>
            <DisplayStatus status={status} />
          </form>
        </Paper>
      </Fragment>
    );
  }
}
