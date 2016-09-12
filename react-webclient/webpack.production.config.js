'use strict';
var baseConfig = require('./webpack.config');
var _ = require('lodash');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var buildDate = (new Date());

if (process.env.API_URL === undefined) {
  throw "You must set API_URL env var"
}

if (process.env.WEBPACK_HOSTNAME === undefined) {
  throw "You must set WEBPACK_HOSTNAME env var. This is the hostname you will use in production."
}

var config = _.merge({}, baseConfig, {
  cache: false,
  output: {
    path: __dirname + '/build',
    filename: '[name]-[hash].js',
    publicPath: ''
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanPlugin(['build'], {root: process.cwd(), verbose: false}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      minify: {
        collapseWhitespace: true
      },
      inject: false,
      template: __dirname + '/templates/production/index.html',
      buildDate: {
        unix: buildDate.getTime(),
        string: buildDate.toString(),
        date: buildDate.toDateString()
      },
      hostname: process.env.WEBPACK_HOSTNAME
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  debug: false,
  devtool: false
});

module.exports = config;
