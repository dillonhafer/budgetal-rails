import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import {showMessage} from './utils/flash-box';
window.showMessage = showMessage;

import './assets/stylesheets/app';

import CashFlowPlans from './components/cashFlowPlans/cash_flow_plans';
registerComponent('CashFlowPlans', CashFlowPlans);

import AllocationPlans from './components/allocationPlans/allocation-plans';
registerComponent('AllocationPlans', AllocationPlans);

import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
registerComponent('AnnualBudgetItems', AnnualBudgetItems);

import Statistics from './components/statistics/statistics';
registerComponent('Statistics', Statistics);

import Sessions from './components/sessions/sessions';
registerComponent('Sessions', Sessions);

import SignInLink from './components/sessions/sign-in-link';
registerComponent('SignInLink', SignInLink);

import Footer from './components/layout/footer';
registerComponent('Footer', Footer);

document.addEventListener('DOMContentLoaded', function() {
  var box = document.querySelector('.flash-box');
  if (box) {
   var message = box.innerHTML;
   box.parentNode.removeChild(box);
   showMessage(message);
  }
});