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
import {alert} from '../utils/window';
import {changePassword} from '../data/Users';
import FormInput from './FormInput';

import StyleSheet from './StyleSheet'
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '$menuBackground'
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
      return (
        <TouchableHighlight
          style={styles.saveButton}
          underlayColor={'#6699ff'}
          onPress={this.saveUser}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableHighlight>
      )
    }
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.label}>Account Info</Text>
        <FormInput placeholder='New Password'
                   required={true}
                   format='password'
                   inputType='password'
                   value={this.state.user.password}
                   onChangeText={(password)=> this.setState({user: Object.assign({}, this.state.user, {password})})}
                   label='New Password'
                   returnKeyType='next' />

       <FormInput placeholder='Confirm Password'
                  required={true}
                  format='password_confirmation'
                  inputType='password'
                  password={this.state.user.password}
                  value={this.state.user.password_confirmation}
                  onChangeText={(password_confirmation)=> this.setState({user: Object.assign({}, this.state.user, {password_confirmation})})}
                  label='Confirm'
                  returnKeyType='next' />

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

module.exports = ChangePasswordForm;
