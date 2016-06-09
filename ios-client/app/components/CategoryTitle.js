import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {categoryIcon} from '../Utils/ViewHelpers';
import {monthName} from '../Utils/ViewHelpers';
import {WHITE} from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 24,
    width: 24,
  },
  navTitle: {
    color: WHITE,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
});

class CategoryTitle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const title = this.props.title
    const image = categoryIcon(title);
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <Text style={styles.navTitle}>{title}</Text>
      </View>
    )
  }
}

module.exports = CategoryTitle;
