import React, {} from 'react'
import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
const {width} = Dimensions.get('window');

EStyleSheet.build({
  backButtonColor: '#ffffff',
  backgroundColor: '#ffffff',
  blue: '#6699ff',
  white: '#ffffff',
  grayBackground: '#eeeeee',
  gray: 'gray',
  graySeparator: '#cccccc',
  grayBorder: '#dddddd',
  clear: 'transparent',
  darkBlue: '#1377ab',
  green: '#8daa37',
  red: '#ff3b30',
  menuBackground: '#333333',
  menuBackground_dark: '#222222',
  darkTitle: '#555555',
  formGray: '#aaaaaa',
  formBackground: '#efeff4',
  formLabel: '#6d6d72',
  rem: width / 32,
});

const defaultStyles = {
  $pagedList: {
    highlightColor: '#eee',
  }
};

class StyleSheet {
  static create(styles) {
    let eStyles = {
      ...styles,
      ...defaultStyles
    };
    return EStyleSheet.create(eStyles);
  }
}

module.exports = StyleSheet;
