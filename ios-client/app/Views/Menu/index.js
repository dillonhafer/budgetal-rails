import React, {
  Component,
} from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import {MENU_BACKGROUND} from '../../constants/Colors';
import AppImages from '../../../components/app_images';
import MenuItem from './MenuItem';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: width,
    paddingTop: 40,
    backgroundColor: MENU_BACKGROUND,
    height: height,
  },
});

class Menu extends Component {
  render() {
    return (
      <View style={styles.menu}>
        <MenuItem text="Budgets" image={AppImages.cash} onPress={this.props.budgets} />
        <MenuItem text="Detailed Budgets" image={AppImages.list} onPress={this.props.detailedBudgets} />
        <MenuItem text="Annual Budgets" image={AppImages.calendar} onPress={this.props.annualBudgets} />
        <MenuItem text="Statistics (for geeks)" image={AppImages.statistics} onPress={this.props.statistics} />
        <MenuItem text="My Account" image={AppImages.account} onPress={this.props.account} />
        <MenuItem text="Sign Out" image={AppImages.sign_out} onPress={this.props.signOut} />
      </View>
    );
  }
};

module.exports = Menu;
