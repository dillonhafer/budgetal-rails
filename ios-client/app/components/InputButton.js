import React, {Component} from 'react'
import {
  Dimensions,
  Text,
  TouchableHighlight,
} from 'react-native'

import StyleSheet from './StyleSheet'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    borderTopColor: '$formBorder',
    borderTopWidth: 0.5,
    borderBottomColor: '$formBorder',
    borderBottomWidth: 0.5,
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: '$white',
    color: '$blue',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '$grayBorder',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})

class InputButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'#6699ff'}
        onPress={this.props.onPress}
        accessible={true}
        accessibilityLabel={this.props.text}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}

module.exports = InputButton;
