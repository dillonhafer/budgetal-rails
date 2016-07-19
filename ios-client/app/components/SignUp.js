import React, {Component} from 'react'
import {
  ActivityIndicatorIOS,
  AsyncStorage,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputContainer,
  InputSeparator,
  InputButton,
} from './form-components'

import {saveTokens, signedIn} from '../data/API';
import {signUp} from '../data/sessions';
import {REMEMBER_EMAIL, REMEMBER_SWITCH} from '../constants/StorageKeys'
const window = require('../utils/window');
import {dismissKeyboard} from '../utils/ViewHelpers';
import {capitalize} from 'lodash-node';

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      animating: false,
      rememberEmail: true
    }
  }

  saveRemember = async (email) => {
    AsyncStorage.multiSet([[REMEMBER_EMAIL, String(email)], [REMEMBER_SWITCH, String(this.state.rememberEmail)]]);
  }

  sigenedIn(json) {
    let key   = json.session.authentication_key;
    let token = json.session.authentication_token;
    let user  = JSON.stringify(json.user);
    return saveTokens(key, token, user);
  }

  missingCredentials(email, password) {
    return (email.length && password.length) ? false : true;
  }

  showActivity() {
    this.setState({animating: true})
  }

  hideActivity() {
    this.setState({animating: false})
  }

  signUp = async () => {
    this.showActivity();
    dismissKeyboard();
    let user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    }

    try {
      let json = await signUp({user});
      if (json != null) {
        this.hideActivity();
        if (json.success) {
          this.saveRemember(user.email);
          this.sigenedIn(json).then(this.props.onSignUp())
        } else {
          let message = '';
          for (key in json.errors) {
            json.errors[key].map((msg) => {
              message += `${capitalize(key)} ${msg}\n`
            })
          }
          window.alert({title: 'Account Errors', message});
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  valid = () => {
    return (
      this.state.first_name.trim().length > 0 &&
      this.state.last_name.trim().length > 0 &&
      this.state.email.trim().match(/\b[^@]+@[^@]+\B/) &&
      this.state.password.length > 7 &&
      this.state.password === this.state.password_confirmation
    )
  }

  render() {
    const disabledStyles = this.valid() ? {} : styles.disabledButton;
    return (
      <FormContainer>
        <FormLabel label='SIGN UP' />
        <InputContainer>
          <FormInput placeholder='First Name'
                     required={true}
                     format='any'
                     autoCorrect={false}
                     autoCapitalize='words'
                     value={this.state.first_name}
                     onChangeText={(first_name) => this.setState({first_name})}
                     label='First Name'
                     returnKeyType='next'
                     defaultValue={this.state.first_name} />

          <InputSeparator />

          <FormInput placeholder='Last Name'
                     required={true}
                     format='any'
                     autoCorrect={false}
                     autoCapitalize='words'
                     value={this.state.last_name}
                     onChangeText={(last_name) => this.setState({last_name})}
                     label='Last Name'
                     returnKeyType='next'
                     defaultValue={this.state.last_name} />

          <InputSeparator />

          <FormInput placeholder='email@example.com'
                     required={true}
                     format='email'
                     keyboardType='email-address'
                     value={this.state.email}
                     onChangeText={(email) => this.setState({email})}
                     label='Email'
                     returnKeyType='next'
                     defaultValue={this.state.email} />

          <InputSeparator />

          <FormInput placeholder='Password'
                     required={true}
                     format='password'
                     inputType='password'
                     value={this.state.password}
                     onChangeText={(password) => this.setState({password})}
                     label='New Password'
                     returnKeyType='next' />

          <InputSeparator />

          <FormInput placeholder='Confirm Password'
                     required={true}
                     format='password_confirmation'
                     inputType='password'
                     password={this.state.password}
                     value={this.state.password_confirmation}
                     onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                     label='Confirm'
                     returnKeyType='done' />

        </InputContainer>

        <InputButton onPress={this.signUp} text='Sign Up' disabled={!this.valid()} />
      </FormContainer>
    );
  }
}

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  button: {
    backgroundColor: '$blue',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    borderColor: '$backgroundColor',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  disabledButton: {
    opacity: 0.25,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '$backgroundColor',
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '$formBackground',
    paddingTop: 20,
  },
  inputs: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    height: 40,
    borderColor: '$backgroundColor',
    backgroundColor: '$backgroundColor',
    borderWidth: 1,
    borderRadius: 5,
  },
});

module.exports = SignUp;
