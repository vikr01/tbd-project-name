// @flow
import React, { Fragment } from 'react';
import { Typography, Paper } from '@material-ui/core';
import MapView from './MapView';

const OverviewView = () => (
  <Fragment>
    <Paper className="paperDashboard">
      <MapView />
    </Paper>
  </Fragment>
);

export default OverviewView;
