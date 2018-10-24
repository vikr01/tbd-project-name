// @flow
import React, { Fragment } from 'react';

import { Typography, Button } from '@material-ui/core';

import { geolocated, geoPropTypes } from 'react-geolocated';
import RequestForm from './RequestForm';
import GMapsControl from './GMapsControl';

function LiveGMapView({
  showMap,
  doRequest,
  data,
  route,
  routeSet,
  duration,
  distance,
}: props) {
  if (showMap) {
    return (
      <Fragment>
        <RequestForm
          sendRequest={doRequest}
          duration={duration}
          distance={distance}
        />
        <div style={{ height: '100vh', width: '100%' }}>
          <GMapsControl data={data} route={route} routeSet={routeSet} />
        </div>
      </Fragment>
    );
  }
  return null;
}

function RequestButton({ showMap, startRequest }: props) {
  if (showMap) {
    return null;
  }
  return (
    <Button variant="contained" onClick={startRequest}>
      Request Ride
    </Button>
  );
}

type Props = {
  showMap: boolean,
  startRequest: func,
};
class MapView extends React.Component<Props> {
  state = {
    data: {
      to: { lat: Number, long: Number },
      from: { lat: Number, long: Number },
      route: false,
    },
    duration: null,
    distance: null,
  };

  componentWillReceiveProps = nextProps => {
    const { coords } = this.props;
    if (coords !== nextProps.coords) {
      console.log('we have the persons location');
    }
  };

  doRequest = value => {
    const { coords, isGeolocationEnabled, isGeolocationAvailable } = this.props;
    console.log('we are doing stuf', value);
    console.log(coords);
    console.log('isGeolocationEnabled', isGeolocationEnabled);
    if (!isGeolocationEnabled) {
      alert(
        'Unable to locate you. Please enter your home address under Account Information'
      );
    }
    console.log('isGeolocationAvailable', isGeolocationAvailable);
    let toCoords = {};
    const fromCoords = { lat: coords.latitude, long: coords.longitude };
    if (value === 'SFO') {
      toCoords = { lat: 37.6213129, long: -122.3811441 };
    } else if (value === 'OAK') {
      toCoords = { lat: 37.7125689, long: -122.2219315 };
    } else if (value === 'SJC') {
      toCoords = { lat: 37.3639472, long: -121.9311262 };
    }

    this.setState({ data: { to: toCoords, from: fromCoords }, route: true });
  };

  routeSet = (duration, distance) => {
    console.log('set route prop to false', duration);
    this.setState({ route: false, duration, distance });
  };

  render() {
    const { showMap, startRequest } = this.props;
    const { data, route, duration, distance } = this.state;
    return (
      <Fragment>
        <Typography variant="h4" className="dashboardComponent2">
          Map
        </Typography>
        <RequestButton showMap={showMap} startRequest={startRequest} />
        <LiveGMapView
          showMap={showMap}
          doRequest={this.doRequest}
          data={data}
          route={route}
          routeSet={(_duration, _distance) =>
            this.routeSet(_duration, _distance)
          }
          duration={duration}
          distance={distance}
        />
      </Fragment>
    );
  }
}

MapView.propTypes = { ...MapView.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MapView);
