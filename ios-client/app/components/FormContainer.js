import React, {Component} from 'react'
import {
  View,
} from 'react-native'

import {
  FormInput,
  InputContainer,
} from './form-components'

import NumberPadAccessory from './NumberPadAccessory'
import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$formBackground'
  }
})

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNumberPadAccessory: false,
    }
  }

  showNumberPadAccessory = () => {
    this.setState({showNumberPadAccessory: true})
  }

  hideNumberPadAccessory = () => {
    this.setState({showNumberPadAccessory: false})
  }

  renderChildren(props) {
    return React.Children.map(props.children, child => {
      if (child.type === InputContainer) {
        return React.cloneElement(child, {children: this.renderChildren(child.props)});
      } else if (child.type === FormInput && child.props.inputType === 'number') {
        return React.cloneElement(child, {
          showNumberPadAccessory: this.showNumberPadAccessory,
          hideNumberPadAccessory: this.hideNumberPadAccessory
        })
      } else {
        return React.cloneElement(child)
      }
    })
  }

  render() {
    return (
      <View style={styles.form}>
        {this.renderChildren(this.props)}
        <NumberPadAccessory numberPadPresent={this.state.showNumberPadAccessory} />
      </View>
    )
  }
}

module.exports = FormContainer;
