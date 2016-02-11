'use strict';

var React = require('react-native');
var MenuButton = require('../MenuButton');
var window = require('../../Utils/window');
var {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import {endSession} from '../../Data/sessions';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#333333',
    height: 900
  },
  cancelButton: {
    color: '#FFF',
    marginLeft: 10,
    marginBottom: 8,
  }
});

var Menu = React.createClass({
  changeRoute: function(name) {
    var route = AppRoutes[name];
    this.props.updateRoute(route);
    this.props.closeMenu();
  },
  annualBudgets: function() {
    var route = AppRoutes.annualBudgets;
    route.nextButton = this.annualNextButton();
    this.props.updateRoute(route);
    this.props.closeMenu();
  },
  signOut: function() {
    endSession().then(() => {
      this.props.closeMenu();
      this.props.signOut();
      window.alert({title: 'Signed Out', message: 'Thanks for using Budgetal!'});
    });
  },
  newAnnualBudget: function() {
    var route = AppRoutes.newAnnualBudgetItem;
    route.left = this.cancelButton()
    route.data = {annual_budget_id: this.props.annualBudgetId};
    this.props.pushRouteBack(route);
    this.props.closeMenu();
  },
  cancelButton: function() {
    return (
      <TouchableOpacity onPress={this.props.popRoute}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>
    );
  },
  annualNextButton: function() {
    return (
      <TouchableOpacity onPress={this.newAnnualBudget}>
        <Image style={{height: 18, width: 25, marginRight: 16, marginBottom: 8}} source={images.plus} />
      </TouchableOpacity>
    );
  },
  render: function() {
    return (
      <View style={styles.menu}>
        <MenuButton image={images.cash} text='Budgets' route={this.changeRoute.bind(this, 'cashFlowPlans')} />
        <MenuButton image={images.list} text='Detailed Budgets' route={this.changeRoute.bind(this, 'allocatedSpendingPlans')} />
        <MenuButton image={images.calendar} text='Annual Budgets' route={this.annualBudgets} />
        <MenuButton image={images.statistics} text='Statistics (for geeks)' route={this.changeRoute.bind(this, 'statistics')} />
        <MenuButton image={images.account} text='My Account' route={this.changeRoute.bind(this, 'myAccount')} />
        <MenuButton image={images.sign_out} text='Sign Out' route={this.signOut} />
      </View>
    );
  }
});

module.exports = Menu;

