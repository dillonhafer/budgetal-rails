import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputContainer,
  InputSeparator,
  InputButton,
} from './form-components'

import {showErrors,validEmail} from '../utils/ViewHelpers';
import {resetPassword} from '../data/Users';
const window = require('../utils/window');

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password_reset_token: this.props.password_reset_token,
      user: {
        password: '',
        password_confirmation: ''
      }
    };
  }

  resetPassword = async() => {
    try {
      const resp = await resetPassword({
        password_reset_token: this.props.password_reset_token,
        user: this.state.user
      });

      if (resp && resp.success) {
        this.props.goBack();
        window.alert({title: 'Password Reset', message: "Your password has been updated"});
      } else {
        this.props.goBack();
        window.alert({title: 'Password Reset Failed', message: "Your email may have expired."});
      }
    } catch (err) {
      console.log(err);
    }
  }

  _resetButton() {
    LayoutAnimation.easeInEaseOut();
    return <InputButton onPress={this.resetPassword} text='Change Password' />
  }

  render() {
    const validForm = (this.state.user.password.length > 7 && this.state.user.password === this.state.user.password_confirmation);
    return (
      <FormContainer>
        <FormLabel label='CHANGE PASSWORD' />
        <InputContainer>
          <FormInput placeholder='New Password'
                     required={true}
                     format='password'
                     inputType='password'
                     value={this.state.user.password}
                     onChangeText={(password)=> this.setState({user: Object.assign({}, this.state.user, {password})})}
                     label='New Password'
                     returnKeyType='next' />

         <InputSeparator />

         <FormInput placeholder='Confirm Password'
                    required={true}
                    format='password_confirmation'
                    inputType='password'
                    password={this.state.user.password}
                    value={this.state.user.password_confirmation}
                    onChangeText={(password_confirmation)=> this.setState({user: Object.assign({}, this.state.user, {password_confirmation})})}
                    label='Confirm'
                    returnKeyType='next' />
        </InputContainer>

        {validForm ? this._resetButton() : null}
      </FormContainer>
    )
  }
}

module.exports = PasswordReset;
