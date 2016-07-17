import React, {Component} from 'react'
import {
  Image,
  Dimensions,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'

import {showErrors} from '../utils/ViewHelpers';
import {saveUser} from '../data/Users';
import FormInput from './FormInput';

import StyleSheet from './StyleSheet'
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 4,
    color: '$formLabel'
  },
  form: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$formBackground'
  },
  text: {
    color: '$blue',
    textAlign: 'center',
    marginTop: 4,
  },
  saveButton: {
    marginTop: 20,
  },
  saveButtonText: {
    textAlign: 'center',
    backgroundColor: '$white',
    color: '$blue',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '$grayBorder',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

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
      return (
        <TouchableHighlight
          style={styles.saveButton}
          underlayColor={'#6699ff'}
          onPress={this.saveUser}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      )
    }
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.label}>ACCOUNT INFO</Text>
        <FormInput placeholder='Emily'
                   required={true}
                   format='any'
                   autoCapitalize='words'
                   value={this.state.user.first_name}
                   onChangeText={(first_name)=> this.setState({user: Object.assign({}, this.state.user, {first_name})})}
                   label='First Name'
                   returnKeyType='next'
                   defaultValue={this.state.user.first_name} />

       <FormInput placeholder='Skywalker'
                  required={true}
                  format='any'
                  autoCapitalize='words'
                  value={this.state.user.last_name}
                  onChangeText={(last_name)=> this.setState({user: Object.assign({}, this.state.user, {last_name})})}
                  label='Last Name'
                  returnKeyType='next'
                  defaultValue={this.state.user.last_name} />

      <FormInput placeholder='emily@jedi.org'
                 required={true}
                 format='email'
                 keyboardType='email-address'
                 value={this.state.user.email}
                 onChangeText={(email)=> this.setState({user: Object.assign({}, this.state.user, {email})})}
                 label='Email'
                 returnKeyType='next'
                 defaultValue={this.state.user.email} />

       <FormInput placeholder='Current Password'
                  required={true}
                  format='password'
                  inputType='password'
                  value={this.state.currentPassword}
                  onChangeText={(currentPassword)=> this.setState({currentPassword})}
                  label='Password'
                  returnKeyType='done' />

        {this.saveButton()}
      </View>
    )
  }
}

module.exports = AccountInfoForm;
