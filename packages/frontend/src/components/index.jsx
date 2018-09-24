// @flow
import '../styles/global.css';
import React from 'react';
import type { Node } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router } from 'react-router-dom';
import SignIn from './signIn';
// import routes from '../routes';

const App = (): Node => (
  <Router>
    <div>
      <SignIn />
      {/* <Router /> */}
    </div>
  </Router>
);

export default hot(module)(App);
