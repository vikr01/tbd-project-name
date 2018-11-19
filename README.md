# Tom's Shuttle Service

<div align="center">
  <img alt="Tom's Shuttle Service" style="max-height:100px;""
      src="./packages/frontend/src/images/logo.png"/>
</div>

<div align="center">
  <a href="https://reactjs.org" rel="noopener" target="_blank">
    <img alt="React" height="60" 
      src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-circle.png"/>
  </a>
  <a href="https://reactjs.org" rel="noopener" target="_blank">
    <img alt="React" height="60" 
      src="https://avatars.githubusercontent.com/u/6412038"/>
  </a>
  <a href="https://material-ui.com/" rel="noopener" target="_blank">
    <img height="60" width="60" src="https://material-ui.com/static/images/material-ui-logo.svg" alt="Material UI"/>
  </a>
  <a href="http://typeorm.io/" rel="noopener" target="_blank">
    <img alt="TypeORM" height="60" src="https://raw.githubusercontent.com/typeorm/typeorm.github.io/master/image/logo/logo.png"/>
  </a> 
  <a href="https://expressjs.com" rel="noopener" target="_blank">
    <img alt="Express" height="60" 
      src="https://avatars.githubusercontent.com/u/5658226"/>
  </a>
  <a href="https://developers.google.com/maps/" rel="noopener" target="_blank">
    <img alt="Google Maps API" height="60" 
      src="https://avatars.githubusercontent.com/u/3717923"/>
  </a>
  <a href="https://webpack.js.org" rel="noopener" target="_blank">
    <img alt="Webpack"  height="60" src="https://raw.githubusercontent.com/webpack/media/master/logo/icon.png"/>
  </a> 
  <a href="https://jestjs.io" rel="noopener" target="_blank">
    <img height="60" src="https://jestjs.io/img/jest.png" alt="Jest"/>
  </a>
</div>

<hr>

<div align="center">

![version](https://img.shields.io/badge/version-0.2.0-blue.svg)
[![Deployed with Heroku](https://img.shields.io/badge/deployed%20with-heroku-purple.svg?logo=heroku)](https://sjshuttle.herokuapp.com)
[![Deploy previews by Netlify](https://img.shields.io/badge/deploy%20previews%20by-netlify-teal.svg?logo=netlify)](https://toms-shuttles.netlify.com)

[![Travis Build Status](https://img.shields.io/travis/com/vikr01/toms-shuttles.svg?label=linux/macOS&logo=linux)](https://travis-ci.com/vikr01/toms-shuttles)
[![Appveyor Build Status](https://img.shields.io/appveyor/ci/vikr01/toms-shuttles.svg?label=windows&logo=windows)](https://ci.appveyor.com/project/vikr01/toms-shuttles/branch/master)
[![Master Coverage Status](https://img.shields.io/codecov/c/github/vikr01/toms-shuttles/master.svg?label=coverage&logo=codecov)](https://codecov.io/gh/vikr01/toms-shuttles/branch/master)
[![Dev Coverage Status](<https://img.shields.io/codecov/c/github/vikr01/toms-shuttles/dev.svg?label=coverage%%20(dev)&logo=codecov>)](https://codecov.io/gh/vikr01/toms-shuttles/branch/dev)

[![Dependency Status](https://img.shields.io/david/vikr01/toms-shuttles.svg?label=dependencies)](https://david-dm.org/vikr01/toms-shuttles)
[![DevDependency Status](https://img.shields.io/david/dev/vikr01/toms-shuttles.svg?label=devDependencies)](https://david-dm.org/vikr01/toms-shuttles?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/vikr01/toms-shuttles/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vikr01/toms-shuttles?targetFile=package.json)
[![Renovate Enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot)](https://renovatebot.com/)

</div>

## Getting Started

You'll need the following:

- [Node.js with a version `>=10` ](https://nodejs.org/en/download/). (You can also [install Node.js with a package manager](https://nodejs.org/en/download/package-manager/).)
- [`yarn` with a version `>=1.10`](https://yarnpkg.com/en/docs/install).

## Installation

First, clone the repo via git:

```bash
git clone https://github.com/vikr01/toms-shuttles.git your-project-name
```

And then install dependencies with `yarn`:

```bash
cd your-project-name
yarn install
```

## Run in Development Mode

See [the instructions in the frontend package](./packages/frontend) for starting the frontend.

See [the instructions in the backend package](./packages/backend) for starting the backend.

## Run in Production Mode

First build the package by running:

```bash
yarn build
```

Then start the application in production by running:

```bash
yarn start
```
