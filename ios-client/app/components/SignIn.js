import React, {Component} from 'react'
import {
  ActivityIndicatorIOS,
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'

import {saveTokens, signedIn} from '../Utils/api';
import {signIn} from '../Data/sessions';
import {REMEMBER_EMAIL, REMEMBER_SWITCH} from '../constants/StorageKeys'
const window = require('../Utils/window');
let _isMounted = false;

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      animating: false,
      rememberEmail: true
    }
  }

  componentDidMount() {
    signedIn().then(isSignedIn => {
      if (isSignedIn) {
        this.props.onSignIn();
      } else {
        this.loadRemember();
        _isMounted = true;
      }
    })
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  loadRemember = async () => {
    let rememberTokens = await AsyncStorage.multiGet([REMEMBER_EMAIL, REMEMBER_SWITCH]);
    if (rememberTokens !== null) {
      let email         = rememberTokens[0][1] || '';
      let rememberEmail = rememberTokens[1][1] === 'true';
      let newState = rememberEmail ? {email, rememberEmail} : {rememberEmail};
      if (_isMounted) {
        this.setState(newState);
      }
    }
  }

  saveRemember = async () => {
    AsyncStorage.multiSet([[REMEMBER_EMAIL, String(this.state.email)], [REMEMBER_SWITCH, String(this.state.rememberEmail)]]);
  }

  sigenedIn(json) {
    let key   = json.session.authentication_key;
    let token = json.session.authentication_token;
    let user  = JSON.stringify(json.user);
    return saveTokens(key, token, user);
  }

  missingCredentials() {
    return (this.state.email.length && this.state.password.length) ? false : true;
  }

  showActivity() {
    this.setState({animating: true})
  }

  hideActivity() {
    this.setState({animating: false})
  }

  blurInputs() {
    this.refs.email.blur();
    this.refs.password.blur();
  }

  buttonClicked = async () => {
    if (this.missingCredentials()) {
      window.alert({title: 'Missing Credentials', message: "Please enter your email and password"});
      return;
    }

    this.blurInputs();
    this.showActivity();
    let user = {email: this.state.email, password: this.state.password};
    this.saveRemember();
    try {
      let json = await signIn({user: user});
      if (json != null) {
        this.hideActivity();
        if (json.success) {
          this.sigenedIn(json)
              .then(() => {
                window.alert({title: 'Welcome Back', message: 'You are now signed in.'});
                this.props.onSignIn();
              })
        } else {
          window.alert({title: 'Invalid Credentials', message: json.message});
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!logo')} />
        <TextInput style={styles.inputs} keyboardType='email-address'
                   autoCorrect={false}
                   autoCapitalize='none'
                   ref="email"
                   onChangeText={(email) => this.setState({email})}
                   placeholder='email@example.com'
                   value={this.state.email} />
        <TextInput placeholder='Password' ref="password" password={true} style={styles.inputs}
                   onChangeText={(password) => this.setState({password})}
                   value={this.state.password} />

        <TouchableHighlight
          style={styles.button}
          underlayColor='#5582DB'
          onPress={this.buttonClicked}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS
          animating={this.state.animating}
          color='#fff'
          style={{height: 80}}
          size="large" />
      </View>
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
    width: 240,
    borderColor: '$backgroundColor',
    borderWidth: 1,
    marginLeft: 40,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '$backgroundColor',
  },
  container: {
    flex: 1,
    height: 568,
    backgroundColor: '$blue',
    paddingTop: 0,
  },
  inputs: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    padding: 10,
    height: 40,
    borderColor: '$backgroundColor',
    backgroundColor: '$backgroundColor',
    borderWidth: 1,
    borderRadius: 5,
  },
  logo: {
    width: 280,
    height: 100,
    marginLeft: 20,
    marginTop: 40,
    resizeMode: 'contain'
  },
});

module.exports = SignIn;
