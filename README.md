# Tom's Shuttle Service

[![Travis Build Status](https://travis-ci.org/vikr01/toms-shuttles.svg?branch=master)](https://travis-ci.org/vikr01/toms-shuttles)
[![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/github/vikr01/toms-shuttles?svg=true)](https://ci.appveyor.com/project/vikr01/toms-shuttles/branch/master)
[![Dependency Status](https://david-dm.org/vikr01/toms-shuttles/status.svg)](https://david-dm.org/vikr01/toms-shuttles)
[![DevDependency Status](https://david-dm.org/vikr01/toms-shuttles/dev-status.svg)](https://david-dm.org/vikr01/toms-shuttles?type=dev)
[![Master Coverage Status](https://img.shields.io/codecov/c/github/vikr01/toms-shuttles/master.svg)](https://codecov.io/gh/vikr01/toms-shuttles/branch/master)
[![Dev Coverage Status](https://img.shields.io/codecov/c/github/vikr01/toms-shuttles/dev.svg)](https://codecov.io/gh/vikr01/toms-shuttles/branch/dev)

## Installation

First, clone the repo via git:

```bash
git clone https://github.com/vikr01/toms-shuttles.git your-project-name
```

And then install dependencies with yarn:

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
