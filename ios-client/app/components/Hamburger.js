import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class Hamburger extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.openMenu} accessible={true} accessibilityLabel={'Menu'}>
          <Icon name="reorder" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  }
}

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
  },
});

module.exports = Hamburger;
