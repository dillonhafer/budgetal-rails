var React = require('react-native');
var BudgetalApp = require('./BudgetalApp');
var reducers = require('../reducers');

var {
  Provider
} = require('react-redux/native')

var {
  createStore,
  applyMiddleware,
  combineReducers
} = require('redux');

var {
  Component,
  View
} = React;

const reducer = combineReducers(reducers)
const store = createStore(reducer);

var App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <BudgetalApp />}
      </Provider>
    );
  }
});

module.exports = App;
