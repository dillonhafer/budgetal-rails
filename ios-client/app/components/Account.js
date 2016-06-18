import React, {Component} from 'react'
import {
  AlertIOS,
  AsyncStorage,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

import StyleSheet from './StyleSheet'
import {USER_KEY} from '../constants/StorageKeys'

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

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async() => {
    let user = await AsyncStorage.getItem(USER_KEY);
    if (user !== null) {
      this.setState({user: JSON.parse(user)});
    }
  }

  render() {
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
}

module.exports = Account;
