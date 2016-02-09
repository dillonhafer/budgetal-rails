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

var config = _.merge({}, baseConfig, {
  cache: false,
  output: {
    path: __dirname + '/build',
    filename: '[name]-[hash].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanPlugin(['build'], {root: process.cwd(), verbose: false}),
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
    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true
    }),
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
      }
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    })
  ],
  debug: false,
  devtool: false
});

module.exports = config;
