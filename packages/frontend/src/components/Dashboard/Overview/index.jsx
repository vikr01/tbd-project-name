// @flow
import React, { Fragment } from 'react';
import { Typography, Paper } from '@material-ui/core';
import MapView from './MapView';

const OverviewView = () => (
  <Fragment>
    <Paper className="paperDashboard">
      <Typography variant="display1" gutterBottom component="h2">
        OverviewView
      </Typography>
      <MapView />
    </Paper>
    <div className="rest" />
  </Fragment>
);

export default OverviewView;
