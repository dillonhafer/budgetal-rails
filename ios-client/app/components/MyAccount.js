'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LinkingIOS,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View
} = React;

import {AsyncStorage} from 'react-native';
const USER_KEY = '@BudgetalUserKey:user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  instructions: {
    textAlign: 'left',
    color: '#333',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  base64: {
    borderRadius: 75,
    height: 150,
    width: 150,
    borderColor: '#69F',
    borderWidth: 3,
    resizeMode: 'contain'
  }
});

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
        <Text
          onPress={() => {
            this.props.dispatch({ type: 'push', key: 'home' });
          }}>
          Tap to go back home.
        </Text>
      </View>
    )
  }
})

module.exports = MyAccount;
