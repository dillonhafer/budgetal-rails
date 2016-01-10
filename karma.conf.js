var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'sinon'],
    files: ['webpack/tests.config.js'],
    preprocessors: {
      'webpack/tests.config.js': ['webpack', 'sourcemap']
    },
    reporters: ['super-dots'],
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
      devtool: 'inline-source-map',
    },
    webpackServer: {
      noInfo: true
    }
  });
};
