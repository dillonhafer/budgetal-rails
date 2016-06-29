React Native Client
--------

This is the React Native client

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
$ patches/./patch.sh
$ react-native run-ios
```

### Testing

1. Unit tests: `npm test`
2. Integration Tests: `open iOS/Budgetal.xcodeproj` then press `⌘U`
