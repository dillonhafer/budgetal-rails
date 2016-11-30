'use strict';
var baseConfig = require('./webpack.config');
var _ = require('lodash');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var envOpts = {
  API_URL: process.env.API_URL || 'http://localhost:3000'
};

var config = _.merge({}, baseConfig, {
  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:9999',
  ],
  output: {
    path: __dirname + '/public',
    filename: 'main.js',
    publicPath: '/'
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin(__dirname+'/public/main.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin({
      filename: './public/index.html',
      template: __dirname + '/templates/dev/index.html'
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(envOpts.API_URL)
    })
  ]
})
module.exports = config;
