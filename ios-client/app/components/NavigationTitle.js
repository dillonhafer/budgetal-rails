//@flow
import React, {Component} from 'react'
import {
  Image,
  Text,
  View
} from 'react-native'

import {categoryIcon} from '../utils/ViewHelpers';
import {monthName} from '../utils/ViewHelpers';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 200,
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 6,
    marginLeft: -24,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  navTitle: {
    color: '$white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    width: 200,
  },
  iconTitle: {
    color: '$white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
  },
});

class NavigationTitle extends Component {
  constructor(props) {
    super(props)
  }

  _getIconTitle(title: String) {
    const image = categoryIcon(title);
    return (
      <View style={styles.iconContainer}>
        <Image style={styles.image} source={image} />
        <Text numberOfLines={1} style={[styles.iconTitle]}>{title}</Text>
      </View>
    )
  }

  _getTextTitle(title) {
    return <Text numberOfLines={1} style={styles.navTitle}>{title}</Text>
  }

  _getTitle(icon: Boolean, title: String) {
    if (icon) {
      return this._getIconTitle(title);
    } else {
      return this._getTextTitle(title);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this._getTitle(this.props.categoryIcon, this.props.title)}
      </View>
    )
  }
}

module.exports = NavigationTitle;
