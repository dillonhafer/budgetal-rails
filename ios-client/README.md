React Native Client [![Codeship](https://img.shields.io/codeship/00c1fa10-b5c6-0133-b267-7a55e39a3182/master.svg?style=flat-square)](https://codeship.com/projects/134157)
--------

This is the React Native client for [Budgetal](https://github.com/dillonhafer/budgetal)

Setup
-----

**Start the API Server**

```bash
$ git clone https://github.com/dillonhafer/budgetal
$ cd budgetal/rails-api && bundle
$ cp .env{.example,}
$ rake db:setup
$ rails server
```

**Run in the simulator**

```bash
$ cd budgetal/ios-client
$ npm install
$ bundle install
$ patches/./patch.sh
$ react-native run-ios
```

### Testing

1. Unit tests: `npm test`
2. Integration Tests: `npm run test:ios`
