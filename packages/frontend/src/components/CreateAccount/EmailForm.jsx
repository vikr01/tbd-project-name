// @flow
import React from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import type { Node } from 'react';

const EmailForm = (): Node => (
  <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="email">Email Address</InputLabel>
    <Input id="email" name="email" autoComplete="email" />
  </FormControl>
);

export default EmailForm;
