// @flow
import '../styles/global.css';
import React from 'react';
import type { Node } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import routes from '../routes';

const App = (): Node => (
  <HashRouter>
    <div>
      <Route path={routes.SIGNUP} component={SignIn} />
      <Route path={routes.DASHBOARD} component={Dashboard} />
    </div>
  </HashRouter>
);

export default hot(module)(App);
