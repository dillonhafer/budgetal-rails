var webpack = require('webpack');

module.exports = function (config) {
  var customLaunchers = {
    ChromeCi: {
      base: 'Chrome',
      flags: [ '--no-sandbox' ]
    }
  }

  config.set({
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 30000,
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'sinon'],
    files: ['webpack.tests.config.js'],
    preprocessors: {
      'webpack.tests.config.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    superDotsReporter: {
      icon: {
        success : '.',
        failure : 'F',
        ignore  : '-'
      },
      color: {
        success : 'blue',
        failure : 'red',
        ignore  : 'yellow'
      }
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }]
      },
      watch: true,
      resolve: {
        extensions: ["", ".js", ".jsx", ".js.jsx"]
      },
      devtool: 'inline-source-map'
    },
    webpackServer: {
      noInfo: true
    }
  });

  if (process.env.TRAVIS) {
    config.browsers = ['ChromeCi'];
  }
};
