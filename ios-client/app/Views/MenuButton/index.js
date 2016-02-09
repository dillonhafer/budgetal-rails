'use strict';

var React = require('react-native');
var styles = require('./styles');
var {
  Image,
  Text,
  TouchableHighlight,
  View,
  Image
} = React;

var MenuButton = React.createClass({
  underlayColor: function() {
    return '#555';
  },
  render: function() {
    return (
      <TouchableHighlight underlayColor={this.underlayColor()} onPress={this.props.route}>
        <View style={styles.box}>
          <Image source={this.props.image} style={styles.icon} />
          <Text style={styles.item}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = MenuButton;
