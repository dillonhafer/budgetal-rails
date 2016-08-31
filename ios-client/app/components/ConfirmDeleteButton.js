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

  render() {
    const buttonStyles = this.props.buttonStyles || styles.defaultButton;
    const textStyles = this.props.textStyles || styles.defaultText;
    return (
      <View>
        <TouchableHighlight
          style={buttonStyles}
          onPress={() => {
            this.confirm(this.props.name, this.props.deleteFunction)
          }}
          underlayColor='#EEE' >
          <Text style={textStyles}>Delete</Text>
        </TouchableHighlight>
        <ConfirmModal name={this.state.name}
                      visible={this.state.visible}
                      deleteFunction={this.state.deleteFunction}
                      cancelFunction={this.cancelConfirm} />
      </View>
    );
  }
}

module.exports = ConfirmDeleteButton;
