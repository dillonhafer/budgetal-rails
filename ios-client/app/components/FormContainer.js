import React, {Component} from 'react'
import {
  View,
} from 'react-native'

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$formBackground'
  }
})

class FormContainer extends Component {
  render() {
    return (
      <View style={styles.form}>
        {this.props.children}
      </View>
    )
  }
}

module.exports = FormContainer;
