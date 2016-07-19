import React, {Component} from 'react'
import {
  ActivityIndicatorIOS,
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import {saveTokens, signedIn} from '../data/API';
import {signIn} from '../data/sessions';
import {REMEMBER_EMAIL, REMEMBER_SWITCH} from '../constants/StorageKeys'
const window = require('../utils/window');
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

  blurInputs() {
    this.refs.email.blur();
    this.refs.password.blur();
  }

  buttonClicked = async () => {
    this.blurInputs();

    let email = this.state.email;
    let password = this.state.password;
    if (!email.length && !password.length) {
      window.alert({title: 'Missing Credentials', message: "Please enter your email and password"});
      return;
    }

    this.showActivity();
    let user = {email,password};
    this.saveRemember(email);
    try {
      let json = await signIn({user});
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
                   accessible={true}
                   accessibilityLabel={'Email'}
                   autoCapitalize='none'
                   ref="email"
                   onBlur={(e) => this.setState({email: e.nativeEvent.text})}
                   placeholder='email@example.com'
                   defaultValue={this.state.email} />
        <TextInput placeholder='Password'
                   ref="password"
                   password={true}
                   style={styles.inputs}
                   accessible={true}
                   accessibilityLabel={'Password'}
                   onChangeText={(password) => this.setState({password})}
                   defaultValue={this.state.password} />

        <TouchableHighlight
          style={styles.button}
          accessible={true}
          accessibilityLabel={'Sign In'}
          underlayColor='#5582DB'
          onPress={this.buttonClicked}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS
          animating={this.state.animating}
          color='#fff'
          style={{height: 80, opacity: (this.state.animating ? 1 : 0)}}
          size="large" />

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={this.props.signUp} style={styles.signUpButton}>
            <Text style={styles.signUpText}>Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.passwordResetRequest} style={styles.signUpButton}>
            <Text style={styles.signUpText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
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
  signUpButton: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
  },
  helpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

module.exports = SignIn;
