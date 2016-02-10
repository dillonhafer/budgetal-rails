'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var styles = require("./styles");
import {AsyncStorage} from 'react-native';
const USER_KEY = '@BudgetalUserKey:user';

var MyAccount = React.createClass({
  getInitialState: function() {
    return {
      user: {first_name: '', last_name: '', email: ''}
    }
  },
  componentDidMount: function() {
    var self = this
    this.getCurrentUser();
  },
  async getCurrentUser() {
    let user = await AsyncStorage.getItem(USER_KEY);
    if (user !== null) {
      this.setState({user: JSON.parse(user)});
    }
  },
  render: function() {
    var user = this.state.user
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Hello {user.first_name}!
        </Text>
        <Image style={styles.base64} source={{uri: user.avatar}} />
        <Text style={styles.instructions}>
          {user.email}
        </Text>
      </View>
    )
  }
})

module.exports = MyAccount;
