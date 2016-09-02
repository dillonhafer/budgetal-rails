import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import ConfirmModal from './ConfirmModal';
import StyleSheet from './StyleSheet';

const styles = StyleSheet.create({
  defaultButton: {
    height: 110,
    width: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '$red',
  },
  defaultText: {
    color: '$white',
    textAlign: 'center',
  },
  text: {
    color: '$white',
    padding: 6,
    textAlign: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '$blue',
  },
});

class ConfirmDeleteButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      visible: false,
      deleteFunction: () => {},
    }
  }

  confirm = (name, deleteFunction) => {
    this.setState({
      name, deleteFunction, visible: true
    })
  }

  cancelConfirm = () => {
    this.setState({visible: false});
  }

  defaultMessage(name) {
    return (
      <View>
        <Text style={styles.text}>Are you sure you want to delete</Text>
        <Text style={[styles.text, styles.boldText]}>{name}</Text>
        <Text style={styles.text}>This cannot be undone</Text>
      </View>
    )
  }

  render() {
    const buttonStyles = this.props.buttonStyles || styles.defaultButton;
    const textStyles = this.props.textStyles || styles.defaultText;
    const buttonText = this.props.buttonText || 'Delete';
    const actionIcon = this.props.actionIcon || 'trash';
    const message = this.props.message || this.defaultMessage(this.props.name);

    return (
      <View>
        <TouchableHighlight
          style={buttonStyles}
          onPress={() => {
            this.confirm(this.props.name, this.props.deleteFunction)
          }}
          underlayColor='#EEE' >
          <Text style={textStyles}>{buttonText}</Text>
        </TouchableHighlight>
        <ConfirmModal message={message}
                      visible={this.state.visible}
                      actionIcon={actionIcon}
                      deleteFunction={this.state.deleteFunction}
                      cancelFunction={this.cancelConfirm} />
      </View>
    );
  }
}

module.exports = ConfirmDeleteButton;
