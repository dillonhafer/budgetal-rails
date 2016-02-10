'use strict';

var React = require('react-native');
var Menu = require('../Menu');
var {
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginBottom: 15,
    marginLeft: 18
  }
});

var Icon = require('react-native-vector-icons/FontAwesome');
var MenuIcon = React.createClass({
  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.props.openMenu}>
        <Icon name='bars' size={24} color='#fff' style={styles.icon} />
      </TouchableHighlight>
    )
  }
});

module.exports = MenuIcon;
