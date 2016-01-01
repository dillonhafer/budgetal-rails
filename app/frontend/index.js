import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import './assets/stylesheets/app';

import CashFlowPlans from './components/cashFlowPlans/cash_flow_plans';
registerComponent('CashFlowPlans', CashFlowPlans);

import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
registerComponent('AnnualBudgetItems', AnnualBudgetItems);

import Statistics from './components/statistics/statistics';
registerComponent('Statistics', Statistics);

import Sessions from './components/sessions/sessions';
registerComponent('Sessions', Sessions);

document.addEventListener('DOMContentLoaded', function() {
  var box = document.querySelector('.flash-box');
  if (box) {
    var message = box.innerHTML;
    box.parentNode.removeChild(box);
    showMessage(message);
  }
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('flash-box')) {
    e.target.parentNode.removeChild(e.target);
  }
});