'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginTop: 4
  },
  back: {
    width: 32,
    height: 32,
    marginTop: -5,
    marginLeft: 5
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
  rightYear: {
    alignItems: 'flex-end'
  },
  leftYear: {
  },
  button: {
    backgroundColor: 'white',
    color: '#6699FF',
    marginTop: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  date: {
    color: '#000',
    justifyContent: 'center',
    fontSize: 16
  },
  redButton: {
    backgroundColor: '#f04124'
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#6699FF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listItem: {
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  inputs: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '#DDD',
    backgroundColor: 'white',
    textAlign: 'right',
    borderWidth: 0,
  },
  instructions: {
    textAlign: 'left',
    color: '#fff',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  logo: {
    marginLeft: 40,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flexDirection: 'row'
  },
  column: {
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    padding: 4
  },
  amount: {
    fontSize: 16,
    padding: 4
  },
  amountMonth: {
    padding: 4
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidLabel: {
    backgroundColor: '#8daa37',
    color: 'white',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 4,
    fontWeight: 'bold'
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
  },
  list: {
    backgroundColor: '#FFF',
    flex: 1
  },
  paidSwitch: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 0
  },
  paidText: {
    fontSize: 16,
    marginRight: 40,
    color: '#333'
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
    color: '#333'
  },
  form: {
    paddingTop: 20,
    backgroundColor: '#E4E4E4'
  },
  nothing: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -250
  },
  changeYear: {
    marginTop: 10
  }
});

