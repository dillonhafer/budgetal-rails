import React, {
  Component,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {MENU_BACKGROUND,GRAY_BORDER,WHITE,MENU_BACKGROUND_DARK} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  separator: {
    borderBottomColor: GRAY_BORDER,
    borderBottomWidth: 0.5,
  },
  text: {
    color: WHITE,
    fontSize: 16,
  },
  image: {
    width: 28,
    height: 28,
    marginRight: 10,
  }
});

class MenuItem extends Component {
  _renderSeparator(text) {
    if (text !== 'Sign Out') {
      return <View style={styles.separator} />
    }
  }

  render() {
    return (
      <View>
        <TouchableHighlight underlayColor={MENU_BACKGROUND_DARK} onPress={this.props.onPress}>
          <View style={styles.container}>
            <Image source={this.props.image} style={styles.image} />
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
        {this._renderSeparator(this.props.text)}
      </View>
    );
  }
};

module.exports = MenuItem;
