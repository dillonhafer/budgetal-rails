'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  main: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderBottomColor: '#DDD'
  },
  text: {
    fontSize: 16
  }
})

var StatsBar = React.createClass({
  render: function() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>{this.props.name} used {this.props.percentage}%</Text>
      </View>
    )
  }
});

module.exports = StatsBar;