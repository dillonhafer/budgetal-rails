'use strict';

var React = require('react-native');
var Menu = require('../Menu');
var { Icon, } = require('react-native-icons');
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

var MenuIcon = React.createClass({
  toggleMenu(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  },
  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.toggleMenu}>
        <Icon name='fontawesome|bars'
              size={24}
              color='#fff'
              style={styles.icon} />
      </TouchableHighlight>
    )
  }
});

MenuIcon.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

module.exports = MenuIcon;
