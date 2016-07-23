import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class Hamburger extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.openMenu}
                        style={styles.hamburgerContainer}
                        accessible={true}
                        accessibilityLabel={'Menu'}>
        <Icon name="reorder" style={styles.icon} />
      </TouchableOpacity>
    );
  }
}

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  hamburgerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  icon: {
    textAlign: 'left',
    color: '$backButtonColor',
    fontSize: 24,
    width: 24,
    height: 24,
  },
});

module.exports = Hamburger;
