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
      email: '',
      loading: false,
    };
  }

  resetPassword = async() => {
    try {
      this.setState({loading: true});
      let resp = await resetPasswordRequest({email: this.state.email});
      this.props.goBack();
      window.alert({title: 'Password Reset', message: "We just sent you an email with instructions on how to reset your password"});
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({loading: false});
    }
  }

  render() {
    const disabled = !validEmail(this.state.email) || this.state.loading;
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

        <InputButton disabled={disabled}
                     loading={this.state.loading}
                     onPress={this.resetPassword}
                     text='Request Password Reset' />
      </FormContainer>
    )
  }
}

module.exports = PasswordResetRequest;
