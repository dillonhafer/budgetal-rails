'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  back: {
    width: 32,
    height: 32,
    marginTop: -5,
    marginLeft: 5
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 4
  },
  instructions: {
    textAlign: 'left',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  list: {
    backgroundColor: '#FFF',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: '#FFF',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row'
  },
  column: {
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
  },
  rightYear: {
    alignItems: 'flex-end'
  },
  leftYear: {
  },
  logo: {
    height: 64,
    width: 64,
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
    padding: 4
  },
  yearModifier: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderBottomColor: '#DDD'
  },
  centerYear: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
    marginTop: 4
  },
});
