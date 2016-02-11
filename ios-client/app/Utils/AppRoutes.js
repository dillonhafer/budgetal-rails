'use strict';

var React = require('react-native');
var { View } = React;

var AnnualBudgets = require('../Views/AnnualBudgets');
var NewAnnualBudgets = require('../Views/AnnualBudgets/form');
var SignIn = require('../Views/SignIn');
var CashFlowPlans = require('../Views/budgets');
var AllocatedSpendingPlans = require('../Views/AllocatedSpendingPlans');
var Statistics = require('../Views/Statistics');
var MyAccount = require('../Views/MyAccount');

var cashFlowPlans = {
  title: 'Budgets',
  component: CashFlowPlans
};

var allocatedSpendingPlans = {
  title: 'Detailed Budgets',
  component: AllocatedSpendingPlans
};

var annualBudgets = {
  title: 'Annual Budgets',
  component: AnnualBudgets
};

var statistics = {
  title: 'Statistics',
  component: Statistics
};

var myAccount = {
  title: 'My Account',
  component: MyAccount
};

var newAnnualBudgetItem = {
  title: 'New Budget Item',
  component: NewAnnualBudgets
};

var signIn = {
  left: <View />,
  title: '',
  component: SignIn
};

var AppRoutes = {
  cashFlowPlans,
  allocatedSpendingPlans,
  annualBudgets,
  newAnnualBudgetItem,
  statistics,
  myAccount,
  signIn
};

module.exports = AppRoutes;
