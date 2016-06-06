import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const NavigationRootContainer = require('NavigationRootContainer');
import Icon from 'react-native-vector-icons/FontAwesome';
import {WHITE} from '../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  icon: {
    textAlign: 'center',
    color: WHITE,
    fontSize: 28,
  },
  text: {
    color: WHITE,
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
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.onNavigate(NavigationRootContainer.getBackAction())}>
        {this.buttonType(this.props.text)}
      </TouchableOpacity>
    )
  }
}

module.exports = BackButton;
