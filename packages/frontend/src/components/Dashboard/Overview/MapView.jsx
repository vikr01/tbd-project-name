// @flow
import React, { Fragment } from 'react';

import { Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';

const MapView = () => (
  <Fragment>
    <Typography variant="display1" className="dashboardComponent2">
      Map
    </Typography>
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={API_KEY}
        defaultCenter={{ lat: 37.4151628, lng: -122.000171 }}
        defaultZoom={11}
      />
    </div>
  </Fragment>
);

export default MapView;
