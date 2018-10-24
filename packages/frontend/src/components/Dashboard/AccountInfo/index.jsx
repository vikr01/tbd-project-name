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

  renderContent() {
    const { error, loaded, name, username, creditInfo } = this.state;
    if (!loaded) {
      return (
        <Typography variant="h4" gutterBottom component="h2">
          Loading...
        </Typography>
      );
    }
    if (error) {
      return (
        <Typography variant="h4" gutterBottom component="h2">
          Unable to load user info
        </Typography>
      );
    }
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          AccountInfoView
        </Typography>
        <div>
          <Typography variant="h5" className="accountOverviewItem">
            Name: {name}
          </Typography>
          <Typography variant="h5" className="accountOverviewItem">
            Username: {username}
          </Typography>
          <Typography variant="h5" className="accountOverviewItem">
            Card number: {creditInfo}
          </Typography>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Paper className="paperDashboard">{this.renderContent()}</Paper>
        <div className="rest" />
      </Fragment>
    );
  }
}
