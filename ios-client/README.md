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
$ react-native run-ios
```

### Testing

1. Unit tests: `npm test`
2. Integration Tests: `npm run test:ios`

### Preview

<img src="https://image-store.slidesharecdn.com/38b03519-c0d7-4dcb-b829-d0bc8895b537-large.png" width="30%" />
&nbsp;&nbsp;&nbsp;
<img src="https://image-store.slidesharecdn.com/aa3f76e5-7c36-4d51-87ed-c6c2071a5c1a-large.png" width="30%" />
&nbsp;&nbsp;&nbsp;
<img src="https://image-store.slidesharecdn.com/aba27c06-96d9-4e99-ab2b-4d5bea6df733-large.png" width="30%" />
