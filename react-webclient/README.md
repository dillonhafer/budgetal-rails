React Client
--------

This is the webclient for [Budgetal](https://github.com/dillonhafer/budgetal)

Setup
-----

First make sure the [dependencies](#dependencies) are met. Then:

```bash
$ git clone https://github.com/dillonhafer/budgetal
$ cd budgetal/budgetal-webclient
$ npm install
$ npm run server
$ open http://localhost:9999
```

### Environment Variables

**Development**

The api url for development and production deploys can be configured with environment variables to allow for flexible/extendable uses.
The following env vars are available to override and are shown with their default values:

```
API_URL=http://localhost:3000
NODE_PORT=9999
NODE_ADDRESS=localhost
```

**Production/Deployment**

You must copy the `.env.example` file and set the proper variables before you deploy. You need to install the [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html). Once those are done you simply run:

```
$ npm run deploy
```

### Dependencies

**Budgetal API server**

Install the rails [Budgetal API server](https://github.com/dillonhafer/budgetal/rails-api) and have it running.

**node/npm/webpack**

Budgetal Webclient is built with webpack and needs npm/node

```bash
$ brew install node
```
