import React, {Component} from 'react'
import {
  Dimensions,
  Text,
} from 'react-native'

import StyleSheet from './StyleSheet'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginBottom: 4,
    color: '$formLabel',
    width: '95%',
    alignSelf: 'flex-end',
  },
})

class FormLabel extends Component {
  render() {
    return <Text style={styles.label}>{this.props.label}</Text>
  }
}

module.exports = FormLabel;
