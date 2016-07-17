import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {showErrors} from '../utils/ViewHelpers';
import {alert} from '../utils/window';
import {changePassword} from '../data/Users';
import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPassword: '',
      user: {
        password: '',
        passwordConfirmation: '',
      },
    };
  }

  saveUser = async() => {
    const params = {
      current_password: this.state.currentPassword,
      user: {
        password: this.state.user.password,
        password_confirmation: this.state.user.password_confirmation,
      }
    };

    try {
      const resp = await changePassword(params);
      if (resp !== null && resp.errors === undefined) {
        this.props.goBack();
        alert({title: 'Success', message: 'Password Changed'})
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.endSession();
    }
  }

  validForm() {
    return (
      this.state.user.password.length > 7 &&
      this.state.user.password_confirmation === this.state.user.password &&
      this.state.currentPassword.length > 7
    )
  }

  saveButton = () => {
    LayoutAnimation.easeInEaseOut();
    if (this.validForm()) {
      return <InputButton onPress={this.saveUser} text='Change Password' />
    }
  }

  render() {
    return (
      <FormContainer>
        <FormLabel label='ACCOUNT PASSWORD' />
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

         <InputSeparator />

         <FormInput placeholder='Current Password'
                    required={true}
                    format='password'
                    inputType='password'
                    value={this.state.currentPassword}
                    onChangeText={(currentPassword)=> this.setState({currentPassword})}
                    label='Password'
                    returnKeyType='done' />
        </InputContainer>

        {this.saveButton()}
      </FormContainer>
    )
  }
}

module.exports = ChangePasswordForm;
