import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StatusBar
} from 'react-native';

import App from './app/budgetal';

StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent('Budgetal', () => App);
