// @flow
import React, { Component, Fragment } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { RadioGroup, Radio, Button, Typography } from '@material-ui/core';
import MyStandaloneSearchBox from './MyStandaloneSearchBox';

type Props = {
  show: number,
  sendRequestToAirport: Function,
  sendRequestFromAirport: Function,
  haveUserPosition: boolean,
  disableRequestButtons: boolean,
};

type State = {
  value: string,
  enteredLocation: {
    lat?: number,
    lng?: number,
  },
  destinationSet: boolean,
  useLoc: boolean,
};

export default class LocationPicker extends Component<Props, State> {
  state: State = {
    value: '',
    enteredLocation: {},
    destinationSet: false,
    useLoc: false,
  };

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  handleLocationEnteredChange = (lat: number, lng: number) => {
    console.log(lat, lng);
    this.setState({ enteredLocation: { lat, lng }, destinationSet: true });
  };

  setUseLoc = (value: boolean) => {
    this.setState({ useLoc: value });
  };

  render() {
    const {
      show,
      sendRequestToAirport,
      sendRequestFromAirport,
      haveUserPosition,
      disableRequestButtons,
    } = this.props;
    const { useLoc } = this.state;
    const { value, enteredLocation, destinationSet } = this.state;
    if (show) {
      if (show === 1) {
        return (
          <Fragment>
            <br />
            <Typography variant="h5">
              Select airport you wish to go to
            </Typography>
            <RadioGroup
              value={value}
              onChange={this.handleChange}
              disabled={disableRequestButtons}
            >
              <FormControlLabel
                value="SFO"
                control={<Radio />}
                label="SFO"
                disabled={disableRequestButtons}
              />
              <FormControlLabel
                value="OAK"
                control={<Radio />}
                label="OAK"
                disabled={disableRequestButtons}
              />
              <FormControlLabel
                value="SJC"
                control={<Radio />}
                label="SJC"
                disabled={disableRequestButtons}
              />
            </RadioGroup>
            <DecideLocation
              useLoc={useLoc}
              haveUserPosition={haveUserPosition}
              setUseLoc={this.setUseLoc}
              handleLocationEnteredChange={this.handleLocationEnteredChange}
              disableRequestButtons={disableRequestButtons}
            />
            <Button
              variant="contained"
              disabled={
                value === '' ||
                (!useLoc && enteredLocation === null) ||
                disableRequestButtons
              }
              onClick={() =>
                haveUserPosition && useLoc
                  ? sendRequestToAirport(value)
                  : sendRequestToAirport(
                      value,
                      enteredLocation.lat,
                      enteredLocation.lng
                    )
              }
            >
              Show route
            </Button>
          </Fragment>
        );
      }
      if (show === 2) {
        return (
          <Fragment>
            <br />
            <Typography variant="h5">
              Select airport you are located at
            </Typography>
            <RadioGroup value={value} onChange={this.handleChange}>
              <FormControlLabel
                value="SFO"
                control={<Radio />}
                label="SFO"
                disabled={disableRequestButtons}
              />
              <FormControlLabel
                value="OAK"
                control={<Radio />}
                label="OAK"
                disabled={disableRequestButtons}
              />
              <FormControlLabel
                value="SJC"
                control={<Radio />}
                label="SJC"
                disabled={disableRequestButtons}
              />
            </RadioGroup>
            <Typography variant="h5">Enter your destination</Typography>
            <MyStandaloneSearchBox
              onSet={(lat, lng) => this.handleLocationEnteredChange(lat, lng)}
              placeholder="your destination"
            />
            <Button
              variant="contained"
              disabled={
                value === '' || !destinationSet || disableRequestButtons
              }
              onClick={() =>
                sendRequestFromAirport(
                  value,
                  enteredLocation.lat,
                  enteredLocation.lng
                )
              }
            >
              Show route
            </Button>
          </Fragment>
        );
      }
    }

    return null;
  }
}

type DecideLocationProps = {
  useLoc: boolean,
  haveUserPosition: boolean,
  setUseLoc: Function,
  handleLocationEnteredChange: Function,
  disableRequestButtons: boolean,
};

const DecideLocation = ({
  useLoc,
  haveUserPosition,
  setUseLoc,
  handleLocationEnteredChange,
  disableRequestButtons,
}: DecideLocationProps) => (
  <Fragment>
    {haveUserPosition && (
      <Fragment>
        {useLoc && (
          <Fragment>
            <Button
              variant="contained"
              onClick={() => setUseLoc(false)}
              disabled={disableRequestButtons}
            >
              Enter location
            </Button>
            <Typography variant="h5">Currently using your location</Typography>
          </Fragment>
        )}
        {!useLoc && (
          <Button
            variant="contained"
            onClick={() => setUseLoc(true)}
            disabled={disableRequestButtons}
          >
            Use my location
          </Button>
        )}
        <div style={{ height: '8px' }} />
        {!useLoc && (
          <MyStandaloneSearchBox
            onSet={(lat, lng) => handleLocationEnteredChange(lat, lng)}
            placeholder="current location"
          />
        )}
      </Fragment>
    )}
    {!haveUserPosition && (
      <Fragment>
        <Typography variant="h5">
          Enter your current location (Your browser is unable to find your
          location)
        </Typography>
        <MyStandaloneSearchBox
          onSet={(lat, lng) => handleLocationEnteredChange(lat, lng)}
          placeholder="current location"
        />
      </Fragment>
    )}
  </Fragment>
);
