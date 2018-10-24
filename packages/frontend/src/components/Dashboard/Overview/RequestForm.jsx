// @flow
import React, { Component } from 'react';

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import LocationPicker from './LocationPicker';
import CostEstimater from './CostEstimater';

type Props = {
  sendRequest: func,
  duration: object,
  distance: object,
};

export default class RequestForm extends Component<Props> {
  state = {
    value: 0,
  };

  handleChange = (e, val) => this.setState({ value: val });

  render() {
    const { value } = this.state;
    const { sendRequest, duration, distance } = this.props;
    console.log('distance: ', distance);
    return (
      <div className="requestFormToggleLocation">
        <ToggleButtonGroup value={value} exclusive onChange={this.handleChange}>
          <ToggleButton value={1}>To Airport</ToggleButton>
          <ToggleButton value={2}>To Home</ToggleButton>
        </ToggleButtonGroup>
        <LocationPicker show={value} sendRequest={sendRequest} />
        {duration && (
          <Typography variant="h4">
            Estimated duration: {duration.text}
          </Typography>
        )}
        {distance && <CostEstimater meters={distance.value} />}
      </div>
    );
  }
}
