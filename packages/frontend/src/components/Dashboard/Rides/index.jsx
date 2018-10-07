// @flow
import React, { Fragment } from 'react';

import { Typography, Paper } from '@material-ui/core';

const RidesView = () => (
  <Fragment>
    <Paper className="paperDashboard">
      <Typography variant="display1" gutterBottom component="h2">
        Rides
      </Typography>
    </Paper>
    <div className="rest" />
  </Fragment>
);

export default RidesView;
