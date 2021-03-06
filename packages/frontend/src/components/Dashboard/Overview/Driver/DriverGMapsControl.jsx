/* global google */
// @flow
import React, { Fragment } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Polyline,
  TrafficLayer,
  Marker,
} from 'react-google-maps';
import axios from 'axios';
import backendRoutes from 'toms-shuttles-backend/lib/routes';
import AlertDialog from '../AlertDialog';
import SimpleSnackbar from '../SimpleSnackbar';

const DriverGMapsControl = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdFTrNJ3AHz6_978tDmRvRYXbdBHVRLWI&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    async componentDidUpdate() {
      if (this.props.assignedDriver && this.state.allDrivers) {
        clearInterval(this.state.allActiveDriversInterval);
        this.clearAllDrivers();
      }
      if (this.state.atDestination) {
        clearInterval(this.state.toLocationInterval);
        clearInterval(this.state.toLocationCheckInterval);
      }
      // console.log('route: ', this.props.route);
    },
    componentDidMount() {
      this.state.onDirectionChange();
    },
    newPath() {
      return (
        this.state.currentToLat !== this.props.data.to.lat ||
        this.state.currentToLng !== this.props.data.to.lng ||
        this.state.currentFromLat !== this.props.data.from.lat ||
        this.state.currentFromLng !== this.props.data.from.lng
      );
    },
    getDirectionPos(c) {
      return this.state.directions[parseInt(c, 10)];
    },
    doCleartoUserInterval() {
      clearInterval(this.state.toUserInterval);
    },
    clearLocationInterval() {
      clearInterval(this.state.toLocationCheckInterval);
    },
    clearAllDrivers() {
      this.setState({ allDrivers: null });
    },
    async componentWillMount() {
      // fetch all drivers
      console.log('fetch all driver interval start');
      const allDriversInterval = setInterval(async () => {
        try {
          const res = await axios.get(backendRoutes.ALL_ACTIVE_DRIVERS);
          this.setState({ allDrivers: res.data });
        } catch (err) {
          console.error(err);
        }
      }, 1000);
      this.setState({
        startedAllDriverInterval: true,
        allActiveDriversInterval: allDriversInterval,
      });

      await this.setState(() => ({
        atUser: false,
        atDestination: false,
        hasDriverDirections: false,
        startedAllDriverInterval: false,
        allActiveDriversInterval: null,
        currentToLat: 0,
        currentToLng: 0,
        currentFromLat: 0,
        currentFromLng: 0,
        onArrivalToDestinationDialogClosed: async routeCost => {
          console.log('payment stuff happens here, ', routeCost);
          window.location.reload();
        },
        onDriverArrivedDialogClosed: async () => {
          this.setState({
            atUser: true,
            userInCar: true,
            atUserDialogShow: false,
          });
        },
        setLocationInterval: interval => {
          this.setState({
            toLocationInterval: interval,
            atUser: false,
          });
        },
        onDirectionChange: () => {
          this.setState({ route: false });
          let currentDestination = 0;
          this.clearLocationInterval();
          const checkInterval = setInterval(async () => {
            const { driverInfo } = this.props;
            if (driverInfo) {
              const lastNum = currentDestination;
              if (driverInfo.destLat3 !== 0) {
                // use dest3
                if (currentDestination !== 3) {
                  this.state.makePathRequestAndAnimate(
                    driverInfo,
                    3,
                    driverInfo.destLat3,
                    driverInfo.destLng3
                  );
                }
                currentDestination = 3;
              } else if (driverInfo.destLat2 !== 0) {
                if (currentDestination !== 2) {
                  this.state.makePathRequestAndAnimate(
                    driverInfo,
                    2,
                    driverInfo.destLat2,
                    driverInfo.destLng2
                  );
                }
                currentDestination = 2;
                // use dest2
              } else if (driverInfo.destLat1 !== 0) {
                if (currentDestination !== 1) {
                  this.state.makePathRequestAndAnimate(
                    driverInfo,
                    1,
                    driverInfo.destLat1,
                    driverInfo.destLng1
                  );
                }
                currentDestination = 1;
                // use dest1
              }
              if (
                (lastNum === 1 && currentDestination === 2) ||
                (lastNum === 0 && currentDestination === 3)
              ) {
                this.setState({
                  snackbarMessage: 'Rerouting to pick up more passengers.',
                  snackbarOpen: true,
                });
              }
              if (lastNum === 2 && currentDestination === 3) {
                this.setState({
                  snackbarMessage: 'Another passenger needs to be picked up',
                  snackbarOpen: true,
                });
              }
              if (lastNum === 0 && currentDestination !== 0) {
                this.setState({
                  snackbarOpen: true,
                  snackbarMessage:
                    'You have a new passenger. Navigating to their location.',
                });
              }
            }
          }, 1000);

          this.setState({ toLocationCheckInterval: checkInterval });
        },

        makePathRequestAndAnimate: (
          assignedDriver,
          destNum,
          lat: number,
          lng: number
        ) => {
          console.log('makePathRequestAndAnimate ', destNum);
          this.doCleartoUserInterval();
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                assignedDriver.currentLatitude,
                assignedDriver.currentLongitude
              ),
              destination: new google.maps.LatLng(lat, lng),
              travelMode: google.maps.TravelMode.DRIVING,
            },
            async (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result.routes[0].overview_path,
                  hasDriverDirections: true,
                  driverLocation: {
                    lat: assignedDriver.currentLatitude,
                    lng: assignedDriver.currentLongitude,
                  },
                  boundsDriver: result.routes[0].bounds,
                });
                const { duration } = result.routes[0].legs[0];

                const timeToDest = (duration.value / 60) * 1000;
                const timePerInterval = 50;
                const ticksPerInterval =
                  this.state.directions.length / (timeToDest / timePerInterval);
                let c = 0;
                this.setState({ driving: true });

                const interval = setInterval(() => {
                  if (c < this.state.directions.length - 1) {
                    const pos1 = this.getDirectionPos(c);
                    const pos2 = this.getDirectionPos(c + 1);
                    const pos = { lat: pos1.lat(), lng: pos1.lng() };
                    const rot =
                      (180 / 3.141) *
                      Math.atan2(
                        pos2.lng() - pos1.lng(),
                        pos2.lat() - pos1.lat()
                      );
                    this.setState(() => ({
                      driverLocation: pos,
                      driverRotation: rot,
                    }));
                    c += ticksPerInterval;
                  } else {
                    c = this.state.directions.length - 1;
                    this.setState({ driving: false });

                    if (destNum === 1) {
                      // final destination
                      this.setState({ atDestinationDialogShow: true });
                      this.doCleartoUserInterval();
                      console.log('we arrived');
                    } else {
                      // display snackbar
                      this.setState({
                        snackbarOpen: true,
                        snackbarMessage:
                          'You arrived at clients location. Wait for them to accept',
                      });
                    }
                  }
                }, timePerInterval);

                this.setState({ toUserInterval: interval });
              } else {
                console.error(`error fetching directions ${result}`);
                console.error(`status code: ${status}`);
              }
            }
          );
        },
      }));
    },
  })
)(props => (
  <Fragment>
    <SimpleSnackbar open={props.snackbarOpen} message={props.snackbarMessage} />
    <AlertDialog
      open={props.atDestinationDialogShow}
      title="Arrived"
      text="You have arrived at the destination!"
      onClose={() => {
        props.onArrivalToDestinationDialogClosed();
      }}
    />
    <GoogleMap
      ref={map =>
        map && props.boundsDriver && map.fitBounds(props.boundsDriver)
      }
      defaultZoom={11}
      defaultCenter={new google.maps.LatLng(37.3352, -121.8811)}
    >
      <TrafficLayer autoUpdate />
      <DrawUserPosition coords={props.coords} directions={props.directions} />
      {props.directions && (
        <Fragment>
          <Polyline
            path={props.directions}
            geodesic
            options={{
              strokeColor: '#0e0eff',
              strokeOpacity: 0.8,
              strokeWeight: 5,
              clickable: false,
            }}
          />

          {props.driverLocation && (
            <Marker
              position={
                new google.maps.LatLng(
                  props.driverLocation.lat,
                  props.driverLocation.lng
                )
              }
              optimized={false}
              icon={{
                path:
                  'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805zz',
                fillColor: 'red',
                anchor: { x: 25, y: 26 },
                rotation: props.driverRotation,
                strokeColor: 'black',
                strokeWeight: 1,
                scale: 0.6,
                fillOpacity: 1,
              }}
            />
          )}
        </Fragment>
      )}

      {props.driverInfo && !props.directions ? (
        <DrawCarMarker
          key={props.driverInfo.username}
          coords={{
            lat: props.driverInfo.currentLatitude,
            lng: props.driverInfo.currentLongitude,
          }}
          color="red"
        />
      ) : null}
    </GoogleMap>
  </Fragment>
));
type DrawMarkerProps = {
  coords: object,
};

type DrawCarMarkerProps = {
  coords: object,
  color: string,
};

const DrawCarMarker = ({ coords, color }: DrawCarMarkerProps) => {
  if (!coords) return null;
  return (
    <Marker
      position={new google.maps.LatLng(coords.lat, coords.lng)}
      optimized={false}
      icon={{
        path:
          'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805zz',
        fillColor: color,
        anchor: { x: 25, y: 26 },
        strokeColor: 'black',
        strokeWeight: 1,
        scale: 0.6,
        fillOpacity: 1,
      }}
    />
  );
};

const DrawUserPosition = ({ coords }: DrawMarkerProps) => {
  if (!coords) return null;
  return (
    <Marker
      position={new google.maps.LatLng(coords.latitude, coords.longitude)}
      icon={{
        path: 'M 10, 10 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0',
        anchor: { x: 5, y: 5 },
        strokeColor: 'blue',
        strokeWeight: 1,
        fillColor: 'darkblue',
        fillOpacity: 1,
      }}
      labelContent="myLocation"
    />
  );
};

export default DriverGMapsControl;
