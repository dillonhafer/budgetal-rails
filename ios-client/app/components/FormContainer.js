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
      if (!child)
        return child

      let newProps = {};

      switch(child.type) {
        case InputContainer:
          newProps['children'] = this.renderChildren(child.props);
        case FormInput:
          newProps['showNumberPadAccessory'] = this.showNumberPadAccessory
          newProps['hideNumberPadAccessory'] = this.hideNumberPadAccessory
      }

      return React.cloneElement(child, newProps)
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
