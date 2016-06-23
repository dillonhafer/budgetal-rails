import React, {Component} from 'react'
import {
  TouchableOpacity,
  View,
} from 'react-native'
import StyleSheet from './StyleSheet';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  icon: {
    textAlign: 'center',
    color: '$backButtonColor',
    fontSize: 16,
  },
  radius: {
    padding: 4,
    borderRadius: 25 /2,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class BudgetInfoButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.props.showBudgetInfo}>
        <View style={styles.radius}>
          <Icon name="info" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }
}

module.exports = BudgetInfoButton;
