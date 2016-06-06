import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {WHITE, GRAY_BORDER} from '../constants/Colors';
const styles = StyleSheet.create({
  main: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: WHITE,
    borderBottomColor: GRAY_BORDER,
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
