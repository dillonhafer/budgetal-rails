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

var Api = require('../../Utils/ApiUtil');
var {signIn} = require('../../Data/sessions');

var styles = require("./styles");
var CookieManager = require('react-native-cookies');
var MenuIcon = require('../MenuIcon');
var window = require('../../Utils/window');

var SignIn = React.createClass({
  getInitialState: function() {
    return ({email: 'dh@dillonhafer.com', password: 'password', animating: false});
  },
  componentDidMount: function() {
    this.checkSignedIn();
  },
  checkSignedIn: function() {
    var self = this
    CookieManager.getAll((cookies, res) => {
      if (cookies.signed_in) {
        self.props.enableGestures();
        self.props.navigator.props.updateRoute(AppRoutes.cashFlowPlans);
      }
    });
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
    var self = this
    var checkSignedIn = this.checkSignedIn;
    if (this.missingCredentials()) {
      var message = "Please enter your email and password";
      window.alert({title: 'Missing Credentials', message});
    } else {
      self.blurInputs();
      self.showActivity();
      // Api.signIn(this.state.email, this.state.password)
      signIn({email: this.state.email, password: this.state.password})
        .then(function(json) {
          debugger
          self.hideActivity();
          if (json.success) {
            checkSignedIn();
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
