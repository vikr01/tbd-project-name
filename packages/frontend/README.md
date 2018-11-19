# Tom's Shuttle Service - Frontend

[![Dependency Status](https://img.shields.io/david/vikr01/toms-shuttles.svg?label=dependencies&path=packages/frontend)](https://david-dm.org/vikr01/toms-shuttles?path=packages/frontends)
[![DevDependency Status](https://img.shields.io/david/dev/vikr01/toms-shuttles.svg?label=devDependencies&path=packages/frontend)](https://david-dm.org/vikr01/toms-shuttles?path=packages/frontend&type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/vikr01/toms-shuttles/badge.svg?targetFile=packages/frontend/package.json)](https://snyk.io/test/github/vikr01/toms-shuttles?targetFile=packages/frontend/package.json)

## Run in Development Mode

To start the development server, run:

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

## Choosing a specific port

To specify a port, set an environment variable `PORT` first:

```bash
export PORT=4000
```

In this case, the server will be launched on [port 4000](http://localhost:3000).

Alternatively, you can set your `PORT` environment variable in the `.env` file generated from [`.env.example`](./.env.example) after installation.

```bash
# .env file
PORT=4000
```
