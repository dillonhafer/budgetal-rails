import React, {Component} from 'react'
import {
  AsyncStorage,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'

import Sessions from './Sessions'
import StyleSheet from './StyleSheet'
import {USER_KEY} from '../constants/StorageKeys'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '$white',
  },
  avatar: {
    borderRadius: 50,
    height: 100,
    width: 100,
    borderColor: '#69F',
    borderWidth: 2,
    resizeMode: 'contain',
  },
  nameContainer: {
    width: 200,
    marginLeft: 5,
  },
  infoContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    padding: 5,
  },
  info: {
    textAlign: 'left',
    color: '$gray',
    marginLeft: 4,
    width: 170,
    paddingTop: 2,
    paddingBottom: 2,
  },
  icon: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '$gray',
    fontSize: 16,
    width: 16,
    width: 16,
  },
  envelope: {
    fontSize: 14,
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

  _renderHeader = () => {
    const user = this.state.user;
    return (
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={()=>{}}>
          <Image style={styles.avatar} source={{uri: user.avatar}} />
        </TouchableOpacity>
        <View style={styles.nameContainer}>
          <TouchableOpacity onPress={()=>{}} style={styles.infoRow}>
            <Icon name="user" style={styles.icon} />
            <Text style={styles.info}>
              {`${user.first_name} ${user.last_name}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={styles.infoRow}>
            <Icon name="envelope" style={[styles.icon, styles.envelope]} />
            <Text style={styles.info} numberOfLines={1}>
              {user.email}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={styles.infoRow}>
            <Icon name="unlock-alt" style={styles.icon} />
            <Text style={styles.info} numberOfLines={1}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    var user = this.state.user
    return (
      <View style={styles.container}>
        <Sessions header={this._renderHeader} />
      </View>
    )
  }
}

module.exports = Account;
