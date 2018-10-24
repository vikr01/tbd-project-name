// @flow
import React, { Component, Fragment } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { RadioGroup, Radio, Button } from '@material-ui/core';

type Props = {
  show: int,
  sendRequest: func,
};

export default class LocationPicker extends Component<Props> {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { show, sendRequest } = this.props;
    const { value } = this.state;
    if (show) {
      if (show === 1) {
        return (
          <Fragment>
            <RadioGroup value={value} onChange={this.handleChange}>
              <FormControlLabel value="SFO" control={<Radio />} label="SFO" />
              <FormControlLabel value="OAK" control={<Radio />} label="OAK" />
              <FormControlLabel value="SJC" control={<Radio />} label="SJC" />
            </RadioGroup>
            <Button
              variant="contained"
              disabled={value === ''}
              onClick={() => sendRequest(value)}
            >
              Request
            </Button>
          </Fragment>
        );
      }
      if (show === 2) {
        return <p>Testing to home </p>;
      }
    }

    return null;
  }
}
