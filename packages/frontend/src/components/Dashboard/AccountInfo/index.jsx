// @flow
import React, { Fragment } from 'react';

import { Typography, Paper } from '@material-ui/core';

const AccountInfoView = () => (
  <Fragment>
    <Paper className="paperDashboard">
      <Typography variant="display1" gutterBottom component="h2">
        AccountInfoView
      </Typography>
      <div>
        <Typography variant="headline" className="accountOverviewItem">
          Name: Thomas Pedersen
        </Typography>
        <Typography variant="headline" className="accountOverviewItem">
          Username: toep
        </Typography>
        <Typography variant="headline" className="accountOverviewItem">
          Credit card type: VISA
        </Typography>
        <Typography variant="headline" className="accountOverviewItem">
          Card number: **** **** **** 1234
        </Typography>
      </div>
    </Paper>
    <div className="rest" />
  </Fragment>
);

export default AccountInfoView;
