import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StatusBar
} from 'react-native';

import Budgetal from './app/budgetal';

StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent('Budgetal', () => Budgetal);
