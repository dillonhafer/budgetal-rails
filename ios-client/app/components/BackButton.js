import React, {Component} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const NavigationRootContainer = require('NavigationRootContainer');
import Icon from 'react-native-vector-icons/FontAwesome';

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
    color: '#ffffff',
    fontSize: 28,
  },
});

class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.onNavigate(NavigationRootContainer.getBackAction())}>
        <Icon name="angle-left" style={styles.icon} />
      </TouchableOpacity>
    )
  }
}

module.exports = BackButton;
