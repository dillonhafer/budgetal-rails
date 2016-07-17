import React, {Component} from 'react'
import {
  Dimensions,
  View,
} from 'react-native'

import StyleSheet from './StyleSheet'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  inputContainer: {
    borderTopColor: '$formBorder',
    borderTopWidth: 0.5,
    borderBottomColor: '$formBorder',
    borderBottomWidth: 0.5,
    backgroundColor: '$white'
  },
})

class InputContainer extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        {this.props.children}
      </View>
    )
  }
}

module.exports = InputContainer;
