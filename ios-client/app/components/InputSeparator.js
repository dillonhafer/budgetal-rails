import React, {Component} from 'react'
import {
  Dimensions,
  View,
} from 'react-native'

import StyleSheet from './StyleSheet'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  inputSeparator: {
    backgroundColor: '$formBorder',
    height: 0.5,
    width: '95%',
    alignSelf: 'flex-end',
  },
})

class InputSeparator extends Component {
  render() {
    return <View style={styles.inputSeparator} />
  }
}

module.exports = InputSeparator;
