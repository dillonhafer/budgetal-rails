'use strict';

let React = require('react-native');
let {
  ActivityIndicatorIOS,
  AsyncStorage,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  View
} = React;

import {saveTokens} from '../../Utils/api';
import {signIn} from '../../Data/sessions';

const REMEMBER_EMAIL  = '@BudgetalRememberEmail:key';
const REMEMBER_SWITCH = '@BudgetalRememberSwitch:key';

let styles = require("./styles");
let window = require('../../Utils/window');
let _isMounted = false;

let SignIn = React.createClass({
  getInitialState: function() {
    return ({email: '', password: '', animating: false, rememberEmail: true});
  },
  componentDidMount() {
    this.loadRemember();
    _isMounted = true;
  },
  componentWillUnmount() {
    _isMounted = false;
  },
  loadRemember: async function() {
    let rememberTokens = await AsyncStorage.multiGet([REMEMBER_EMAIL, REMEMBER_SWITCH]);
    if (rememberTokens !== null) {
      let email         = rememberTokens[0][1] || '';
      let rememberEmail = rememberTokens[1][1] === 'true';
      let newState = rememberEmail ? {email, rememberEmail} : {rememberEmail};
      if (_isMounted) {
        this.setState(newState);
      }
    }
  },
  saveRemember: async function() {
    AsyncStorage.multiSet([[REMEMBER_EMAIL, String(this.state.email)], [REMEMBER_SWITCH, String(this.state.rememberEmail)]]);
  },
  sigenedIn(json) {
    let key   = json.session.authentication_key;
    let token = json.session.authentication_token;
    let user  = JSON.stringify(json.user);
    return saveTokens(key, token, user);
  },
  missingCredentials: function() {
    return (this.state.email.length && this.state.password.length) ? false : true;
  },
  showActivity: function() {
    this.setState({animating: true})
  },
  hideActivity: function() {
    this.setState({animating: false})
  },
  blurInputs: function() {
    this.refs.email.blur();
    this.refs.password.blur();
  },
  buttonClicked: function() {
    if (this.missingCredentials()) {
      window.alert({title: 'Missing Credentials', message: "Please enter your email and password"});
    } else {
      this.blurInputs();
      this.showActivity();
      let user = {email: this.state.email, password: this.state.password};
      this.saveRemember();
      signIn({user: user})
        .then(json => {
          this.hideActivity();
          if (json.success) {
            this.sigenedIn(json)
            .then(() => {
              this.props.enableGestures();
              this.props.navigator.props.updateRoute(AppRoutes.cashFlowPlans);
              window.alert({title: 'Welcome Back', message: 'You are now signed in.'})
            })
          } else {
            window.alert({title: 'Invalid Credentials', message: json.message});
          }
        });
    }
  },
  render: function() {
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

        <View style={styles.remember}>
          <Switch
            onTintColor='#f6c86f'
            onValueChange={(value) => this.setState({rememberEmail: value})}
            style={styles.switch}
            value={this.state.rememberEmail} />
          <Text style={styles.switchLable}>Remember Me</Text>
        </View>

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
});

module.exports = SignIn;
