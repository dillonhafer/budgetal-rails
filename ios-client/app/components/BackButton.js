import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
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
    textAlign: 'left',
    color: '$backButtonColor',
    fontSize: 28,
    width: 28,
    height: 28,
  },
  text: {
    color: '$backButtonColor',
  }
});

class BackButton extends Component {
  buttonType(text) {
    if (text) {
      return <Text style={styles.text}>{text}</Text>
    } else {
      return <Icon name="angle-left" style={styles.icon} />
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        accessible={true}
        accessibilityLabel={`Back Button`}
        onPress={this.props.onNavigateBack}>
        {this.buttonType(this.props.text)}
      </TouchableOpacity>
    )
  }
}

module.exports = BackButton;
