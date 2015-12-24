'use strict';
var baseConfig = require('./../webpack.config');
var _ = require('lodash');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

var config = _.merge({}, baseConfig, {
  cache: false,
  plugins: [
    {
      new webpack.NoErrorsPlugin(),
      new CleanPlugin(['build']),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
    }
  ]
}

module.exports = config;