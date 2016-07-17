import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {showErrors} from '../utils/ViewHelpers';
import {saveUser} from '../data/Users';
import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

class AccountInfoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPassword: '',
      user: props.user,
    };
  }

  saveUser = async() => {
    const params = {
      current_password: this.state.currentPassword,
      user: {
        first_name: this.state.user.first_name,
        last_name: this.state.user.last_name,
        email: this.state.user.email,
      }
    };

    try {
      const resp = await saveUser(params);
      if (resp !== null && resp.errors === undefined) {
        this.props.updateUser(this.state.user)
        this.props.goBack();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.endSession();
    }
  }

  validForm() {
    return (
      this.state.user.first_name.trim().length &&
      this.state.user.last_name.trim().length &&
      this.state.user.email.trim().length &&
      (this.state.currentPassword.length > 4)
    )
  }

  saveButton = () => {
    LayoutAnimation.easeInEaseOut();
    if (this.validForm()) {
      return <InputButton onPress={this.saveUser} text='Save' />
    }
  }

  render() {
    return (
      <FormContainer>
        <FormLabel label='ACCOUNT INFO' />

        <InputContainer>
          <FormInput placeholder='Emily'
                     required={true}
                     format='any'
                     autoCapitalize='words'
                     value={this.state.user.first_name}
                     onChangeText={(first_name)=> this.setState({user: Object.assign({}, this.state.user, {first_name})})}
                     label='First Name'
                     returnKeyType='next'
                     defaultValue={this.state.user.first_name} />

         <InputSeparator />

         <FormInput placeholder='Skywalker'
                    required={true}
                    format='any'
                    autoCapitalize='words'
                    value={this.state.user.last_name}
                    onChangeText={(last_name)=> this.setState({user: Object.assign({}, this.state.user, {last_name})})}
                    label='Last Name'
                    returnKeyType='next'
                    defaultValue={this.state.user.last_name} />

        <InputSeparator />

        <FormInput placeholder='emily@jedi.org'
                   required={true}
                   format='email'
                   keyboardType='email-address'
                   value={this.state.user.email}
                   onChangeText={(email)=> this.setState({user: Object.assign({}, this.state.user, {email})})}
                   label='Email'
                   returnKeyType='next'
                   defaultValue={this.state.user.email} />

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

module.exports = AccountInfoForm;
