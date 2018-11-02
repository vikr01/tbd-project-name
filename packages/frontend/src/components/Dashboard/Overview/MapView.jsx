// @flow
import React, { Fragment } from 'react';

import { Typography, Button } from '@material-ui/core';

import { geolocated, geoPropTypes } from 'react-geolocated';
import axios from 'axios';
import RequestForm from './RequestForm';
import GMapsControl from './GMapsControl';
import CostEstimater from './CostEstimater';

function LiveGMapView({
  showMap,
  doRequestToAirport,
  doRequestFromAirport,
  data,
  route,
  routeSet,
  duration,
  distance,
  requestRide,
  assignedDriver,
  driverArriving,
}: props) {
  if (showMap) {
    return (
      <Fragment>
        <RequestForm
          sendRequestToAirport={doRequestToAirport}
          sendRequestFromAirport={doRequestFromAirport}
        />
        {duration &&
          distance && (
            <Fragment>
              <Typography variant="h4">
                Estimated duration: {duration.text}
              </Typography>
              <CostEstimater meters={distance.value} />
              <Button variant="contained" onClick={requestRide}>
                Make request
              </Button>
              <br />
            </Fragment>
          )}

        <div style={{ height: '100vh', width: '100%' }}>
          <GMapsControl
            data={data}
            route={route}
            routeSet={routeSet}
            assignedDriver={assignedDriver}
            driverArriving={driverArriving}
          />
        </div>
      </Fragment>
    );
  }
  return null;
}

type RequestButtonProps = {
  showMap: boolean,
  startRequest: func,
};

function RequestButton({ showMap, startRequest }: RequestButtonProps) {
  if (showMap) {
    return null;
  }
  return (
    <Button variant="contained" onClick={startRequest}>
      Request Ride
    </Button>
  );
}

function airportToCoords(airport) {
  if (airport === 'SFO') {
    return { lat: 37.6213129, lng: -122.3811441 };
  }
  if (airport === 'OAK') {
    return { lat: 37.7125689, lng: -122.2219315 };
  }
  if (airport === 'SJC') {
    return { lat: 37.3639472, lng: -121.9311262 };
  }
  return null;
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
      assignedDriver: null,
      driverArriving: false,
    },
    duration: null,
    distance: null,
  };

  static getDerivedStateFromProps(nextProps) {
    const { coords } = nextProps;
    if (coords !== nextProps.coords) {
      console.log('User location aquired');
    }
    return null;
  }

  doRequestToAirport = airport => {
    const { coords, isGeolocationEnabled, isGeolocationAvailable } = this.props;
    console.log('we are doing stuf', airport);
    console.log(coords);
    console.log('isGeolocationEnabled', isGeolocationEnabled);
    if (!isGeolocationEnabled) {
      alert(
        'Unable to locate you. Please enter your home address under Account Information'
      );
    }
    console.log('isGeolocationAvailable', isGeolocationAvailable);
    const fromCoords = { lat: coords.latitude, lng: coords.longitude };
    const toCoords = airportToCoords(airport);
    this.setState({ data: { to: toCoords, from: fromCoords }, route: true });
  };

  doRequestFromAirport = (airport, lat, lng) => {
    const fromCoords = airportToCoords(airport);
    const toCoords = { lat, lng };
    this.setState({ data: { to: toCoords, from: fromCoords }, route: true });
    console.log('from ', airport, ' to ', lat, lng);
  };

  routeSet = (duration, distance) => {
    this.setState({ route: false, duration, distance });
  };

  requestRide = async () => {
    const { data } = this.state;
    console.log('requesting ride now');
    console.log(data);
    let response;
    try {
      response = await axios.get(
        `${backendRoutes.CLOSEST_DRIVER}?lat=${data.from.lat}&long=${
          data.from.lng
        }`
      );
    } catch (error) {
      console.error(error);
    }
    this.setState({ assignedDriver: response.data, driverArriving: true });
  };

  render() {
    const { showMap, startRequest } = this.props;
    const {
      data,
      route,
      duration,
      distance,
      driverArriving,
      assignedDriver,
    } = this.state;
    return (
      <Fragment>
        <Typography variant="h4" className="dashboardComponent2">
          Map
        </Typography>
        <RequestButton showMap={showMap} startRequest={startRequest} />
        <LiveGMapView
          showMap={showMap}
          doRequestToAirport={this.doRequestToAirport}
          doRequestFromAirport={this.doRequestFromAirport}
          data={data}
          route={route}
          routeSet={(_duration, _distance) =>
            this.routeSet(_duration, _distance)
          }
          duration={duration}
          distance={distance}
          requestRide={() => this.requestRide()}
          driverArriving={driverArriving}
          assignedDriver={assignedDriver}
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
