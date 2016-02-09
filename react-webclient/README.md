Budgetal Webclient [![Budgetal Webclient](https://img.shields.io/travis/dillonhafer/budgetal-webclient/master.svg?style=flat-square)](https://travis-ci.org/dillonhafer/budgetal-webclient) [![Budgetal Webclient](https://img.shields.io/codeclimate/github/dillonhafer/budgetal-webclient.svg?style=flat-square)](https://codeclimate.com/github/dillonhafer/budgetal-webclient) [![BADGINATOR](https://img.shields.io/badge/badges-2-brightgreen.svg?style=flat-square)](https://github.com/defunctzombie/badginator)
--------

This is the webclient for [Budgetal](https://github.com/dillonhafer/budgetal)

Setup
-----

### Quick Setup

First make sure the [dependencies](#dependencies) are met. Then:

```bash
$ git clone https://github.com/dillonhafer/budgetal-webclient
$ cd budgetal-webclient
$ npm install
$ npm run serve:dev
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

Install the rails [Budgetal API server](https://github.com/dillonhafer/budgetal) and have it running.

**node/npm/webpack**

Budgetal Webclient is built with webpack and needs npm/node

```bash
$ brew install node
```

## Credits

[![Budgetal](https://s3.amazonaws.com/cdn.budgetal.com/b.png)](https://www.budgetal.com)

Budgetal Webclient is maintained by [Dillon Hafer](http://www.dillonhafer.com). Special thanks to [Mike Chau](https://github.com/mikechau) for his support and inspiration for making react/webpack possible on this project.

## License

Budgetal is Copyright © 2013-2016 Dillon Hafer. It is free software, and may be redistributed under the terms specified below.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
