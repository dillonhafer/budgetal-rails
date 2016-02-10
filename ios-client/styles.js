'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#69F',
    borderBottomColor: '#69F'
  },
  navigatorScene: {
    flex: 1,
    marginTop: 60
  },
  navigator: {
    flex: 1,
    backgroundColor: '#69F'
  },
  navBar: {
    flex: 1,
    backgroundColor: '#69F',
    position: 'absolute',
    paddingBottom: 20,
    top: 20,
    left: 0,
    right: 0
  },
  navBarTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  back: {
    color: '#fff'
  },
  logo: {
    width: 280,
    height: 100,
    marginLeft: 20,
    marginTop: 40,
    resizeMode: 'contain'
  }
});
