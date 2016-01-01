'use strict';
var baseConfig = require('./../webpack.config');
var _ = require('lodash');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({}, baseConfig, {
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin('../../../public/assets/[name].css', {
      allChunks: true
    }),
  ]
})
module.exports = config;
