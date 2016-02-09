var React = require('react-native')
var Redux = require('redux')
var Navigation = require('./Nav')
var BudgetalActions = require('../actions')

var Budgetal = require('../components/budgetal')

var {
  bindActionCreators
} = Redux

var {
  connect
} = require('react-redux/native')

connect(state => ({
  state: state.counter
}))

var BudgetalApp = React.createClass({
  render() {
    const { state, dispatch } = this.props;

    return (
      <Budgetal />
    );
  }
})

module.exports = BudgetalApp
