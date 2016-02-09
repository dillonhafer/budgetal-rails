var React = require('react-native');
var App = require('./app/containers/app');

var {
  AppRegistry,
  Component,
  StatusBarIOS
} = React;
StatusBarIOS.setStyle('light-content', true);

AppRegistry.registerComponent('Budgetal', () => App);
