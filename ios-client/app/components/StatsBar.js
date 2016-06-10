import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  main: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '$grayBorder',
  },
  text: {
    fontSize: 16
  }
})

class StatsBar extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>{this.props.name} used {this.props.percentage}%</Text>
      </View>
    )
  }
}

module.exports = StatsBar;
