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

var Api = require('../../Utils/ApiUtil');
var styles = require("./styles");
var DataRepo = require('../../Data/UserRepository');

var MyAccount = React.createClass({
  getInitialState: function() {
    return {
      user: {first_name: '', last_name: '', email: ''}
    }
  },
  componentDidMount: function() {
    var self = this
    DataRepo.user().then(function(user) {
      var full_name = `${user.first_name} ${user.last_name||''}`
      user.full_name = full_name.trim()
      self.setState({user: user})
    })
  },
  render: function() {
    var user = this.state.user
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Hello {user.first_name}!
        </Text>
        <Text style={styles.instructions}>
          {user.email}
        </Text>
      </View>
    )
  }
})

module.exports = MyAccount;
