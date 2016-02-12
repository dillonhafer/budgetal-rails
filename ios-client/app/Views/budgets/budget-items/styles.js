'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  addButtonContainer: {
    paddingTop: 35,
    flex: 1,
    alignItems: 'center'
  },
  back: {
    width: 32,
    height: 32,
    marginTop: -5,
    marginLeft: 5
  },
  addButton: {
    color: '#69F',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#69F',
    width: 180,
    padding: 4,
    paddingTop: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
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
    alignItems: 'flex-end',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
    width: 400
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
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderBottomColor: '#DDD'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
    marginTop: 4
  },
  empty: {
    color: '#69F',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
    paddingBottom: 30
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
  saveButtonText: {
    textAlign: 'center',
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
});
