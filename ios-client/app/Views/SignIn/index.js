'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

import {saveTokens} from '../../Utils/api';
import {signIn} from '../../Data/sessions';

var styles = require("./styles");
var MenuIcon = require('../MenuIcon');
var window = require('../../Utils/window');

var SignIn = React.createClass({
  getInitialState: function() {
    return ({email: 'dh@dillonhafer.com', password: 'password', animating: false});
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

        <Text style={styles.instructions} onPress={()=> LinkingIOS.openURL(`${baseApi}/sessions/secret/new`)}>
          Forgot password
        </Text>
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
