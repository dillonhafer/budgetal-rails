'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  button: {
    backgroundColor: '#6699ff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    width: 240,
    borderColor: 'white',
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6699ff',
    paddingTop: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  inputs: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    padding: 10,
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  instructions: {
    textAlign: 'left',
    color: '#fff',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  logo: {
    width: 280,
    height: 100,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 40
  },
});

