// @flow
import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@material-ui/core';

type State = {
  name: string,
  username: string,
  creditInfo: string,
  error: boolean,
  loaded: boolean,
};

export default class AccountInfoView extends Component<null, State> {
  state: State;

  componentWillMount() {
    this.setState({ loaded: false });
    this.populateState();
  }

  async populateState() {
    let response;
    try {
      response = await axios.get(backendRoutes.ACCOUNT_INFO);
    } catch (error) {
      console.error(error);
      this.setState({ error: true, loaded: true });
      return;
    }
    console.log(response);
    this.setState({
      name: response.data.name,
      username: response.data.username,
      creditInfo: response.data.creditInfo,
      error: false,
      loaded: true,
    });
  }

  render() {
    const { name, username, creditInfo, error, loaded } = this.state;
    if (!loaded) {
      return null;
    }
    if (error) {
      return (
        <Paper className="paperDashboard">
          <Typography variant="display1" gutterBottom component="h2">
            Unable to load user info
          </Typography>
        </Paper>
      );
    }
    return (
      <Fragment>
        <Paper className="paperDashboard">
          <Typography variant="display1" gutterBottom component="h2">
            AccountInfoView
          </Typography>
          <div>
            <Typography variant="headline" className="accountOverviewItem">
              Name: {name}
            </Typography>
            <Typography variant="headline" className="accountOverviewItem">
              Username: {username}
            </Typography>
            <Typography variant="headline" className="accountOverviewItem">
              Card number: {creditInfo}
            </Typography>
          </div>
        </Paper>
        <div className="rest" />
      </Fragment>
    );
  }
}
