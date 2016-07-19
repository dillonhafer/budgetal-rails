import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputContainer,
  InputButton,
} from './form-components'

import {showErrors,validEmail} from '../utils/ViewHelpers';
import {resetPasswordRequest} from '../data/Users';
const window = require('../utils/window');

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    };
  }

  resetPassword = async() => {
    try {
      let resp = await resetPasswordRequest({email: this.state.email});
      this.props.goBack();
      window.alert({title: 'Password Reset', message: "We just sent you an email with instructions on how to reset your password"});
    } catch (err) {
      console.log(err);
    }
  }

  _resetButton() {
    LayoutAnimation.easeInEaseOut();
    return <InputButton onPress={this.resetPassword} text='Request Password Reset' />
  }

  render() {
    const validForm = validEmail(this.state.email);
    return (
      <FormContainer>
        <FormLabel label='RESET PASSWORD' />
        <InputContainer>
          <FormInput placeholder='email@example.com'
                     required={true}
                     keyboardType='email-address'
                     value={this.state.email}
                     onChangeText={(email) => this.setState({email})}
                     autoCorrect={false}
                     autoCapitalize='none'
                     accessible={true}
                     accessibilityLabel={'Email'}
                     label='Email'
                     defaultValue={this.state.email} />
        </InputContainer>

        {validForm ? this._resetButton() : null}
      </FormContainer>
    )
  }
}

module.exports = PasswordResetRequest;
