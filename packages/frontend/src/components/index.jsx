// @flow
import '../styles/global.css';
import React from 'react';
import type { Node } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignInController from './SignInController';
// import routes from '../routes';

const App = (): Node => (
  <HashRouter>
    <div>
      <Route path="/(|signup)" component={SignInController} />
      <Route path="/dashboard" render={props => <Dashboard {...props} />} />
    </div>
  </HashRouter>
);

export default hot(module)(App);
