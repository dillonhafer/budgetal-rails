'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  item: {
    color: '#FFFFFF',
    padding: 20,
    paddingLeft: 7,
    fontSize: 18
  },
  box: {
    flexDirection: 'row',
    borderBottomColor: '#AAAAAA',
    borderLeftColor: '#333333',
    borderRightColor: '#333333',
    borderTopColor: '#333333',
    borderWidth: 0.5,
    width: 400
  },
  boxTop: {
    borderTopColor: '#333333'
  },
  boxBottom: {
    borderBottomColor: '#333333',
  },
  icon: {
    width: 35,
    height: 28,
    margin: 17,
    marginRight: 0
  }
});
