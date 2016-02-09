'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  hidden: {
    height: 0,
    bottom: -600
  },
  inputAccessory: {
    padding: 10,
    width: 400,
    backgroundColor: '#f6f6f6'
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute'
  },
  doneText: {
    fontSize: 18
  }
});
