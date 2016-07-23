import React, {Component} from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
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
  textContainer: {
    flexDirection: 'row',
    backgroundColor: '$white',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    textAlign: 'center',
    color: '$blue',
    marginLeft: 10,
  },
  indicator: {
    height: 20,
    marginLeft: -15,
  },
})


class InputButton extends Component {
  render() {
    const disabledStyles = this.props.disabled ? {opacity: 0.45} : {opacity: 1};
    return (
      <TouchableHighlight
        style={[styles.button, disabledStyles]}
        disabled={this.props.disabled}
        underlayColor={'#6699ff'}
        onPress={this.props.onPress}
        accessible={true}
        accessibilityLabel={this.props.text}>
        <View style={styles.textContainer}>
          <ActivityIndicator animating={this.props.loading === true}
                             color='#69F'
                             style={styles.indicator}
                             size="small" />
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = InputButton;
