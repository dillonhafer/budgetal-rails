'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var styles = require("./styles");

var AnnualBudgets = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Not done yet
          Find me in: App/Views/AllocatedSpendingPlans
        </Text>
      </View>
    )
  }
})

module.exports = AnnualBudgets;
