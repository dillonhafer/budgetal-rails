import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  FormLabel,
  InputSeparator
} from './form-components'

import {dismissKeyboard} from '../utils/ViewHelpers'

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  predictiveTextButton: {
    width: '100%',
    padding: 10,
    paddingRight: 15,
  },
  predictiveText: {
    textAlign: 'right',
  },
  predictiveTextContainer: {
    paddingBottom: 500,
    alignItems: 'flex-end',
  }
})

class PredictiveTextList extends Component {
  selectText = (text) => {
    dismissKeyboard()
    this.props.onPress(text)
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    const source = this.props.source || []
    if (source.length) {
      return (
        <View style={styles.predictiveTextContainer}>
          <FormLabel label='PAST EXPENSES' />
          {
            source.map((text, idx) => {
              return (
                <View key={`predictive-text-${idx}`}>
                  <InputSeparator />
                  <TouchableOpacity onPress={this.selectText.bind(this,text)} style={styles.predictiveTextButton}>
                    <Text style={styles.predictiveText}>{text}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      )
    } else { return null }
  }
}

module.exports = PredictiveTextList;
