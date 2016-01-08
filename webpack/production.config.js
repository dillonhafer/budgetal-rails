'use strict';
var baseConfig = require('./../webpack.config');
var _ = require('lodash');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({}, baseConfig, {
  cache: false,
  output: {
    path: __dirname + '/../public/assets',
    filename: 'main-[hash].js'
  },
  plugins: [
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
    new ExtractTextPlugin('../../../public/assets/[name]-[hash].css', {
      allChunks: true
    })
  ],
});

module.exports = config;