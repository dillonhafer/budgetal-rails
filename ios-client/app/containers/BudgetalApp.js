var React = require('react-native')
var Budgetal = require('../components/budgetal')
var BudgetalApp = React.createClass({
  render() {
    const { state, dispatch } = this.props;

    return (
      <Budgetal />
    );
  }
})

module.exports = BudgetalApp
