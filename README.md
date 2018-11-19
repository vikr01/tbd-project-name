# Tom's Shuttle Service

![version](https://img.shields.io/badge/version-0.2.0-blue.svg)
[![Deployed with Heroku](https://img.shields.io/badge/deployed%20with-heroku-purple.svg?logo=heroku)](https://sjshuttle.herokuapp.com)

[![Travis Build Status](https://img.shields.io/travis/com/vikr01/toms-shuttles.svg?label=linux/macOS&logo=linux)](https://travis-ci.org/vikr01/toms-shuttles)
[![Appveyor Build Status](https://img.shields.io/appveyor/ci/vikr01/toms-shuttles.svg?label=windows&logo=windows)](https://ci.appveyor.com/project/vikr01/toms-shuttles/branch/master)
[![Master Coverage Status](https://img.shields.io/codecov/c/github/vikr01/toms-shuttles/master.svg?label=coverage&logo=codecov)](https://codecov.io/gh/vikr01/toms-shuttles/branch/master)

[![Dependency Status](https://img.shields.io/david/vikr01/toms-shuttles.svg?label=dependencies)](https://david-dm.org/vikr01/toms-shuttles)
[![DevDependency Status](https://img.shields.io/david/dev/vikr01/toms-shuttles.svg?label=devDependencies)](https://david-dm.org/vikr01/toms-shuttles?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/vikr01/toms-shuttles/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vikr01/toms-shuttles?targetFile=package.json)
[![Renovate Enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot)](https://renovatebot.com/)

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

It is recommended to run the backend and frontend in separate terminal sessions.

See [the instructions in the frontend package](./packages/frontend) for starting the frontend.

See [the instructions in the backend package](./packages/backend) for starting the backend.

If you would rather run both frontend and backend in a single terminal session, you can run:

```bash
yarn dev
```

## Run in Production Mode

First build the package by running:

```bash
yarn build
```

Then start the application in production by running:

```bash
yarn start
```
