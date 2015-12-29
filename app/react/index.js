import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import CashFlowPlans from './components/cashFlowPlans/cash_flow_plans';
registerComponent('CashFlowPlans', CashFlowPlans);

import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
registerComponent('AnnualBudgetItems', AnnualBudgetItems);

import Statistics from './components/statistics/statistics';
registerComponent('Statistics', Statistics);

import SignIn from './components/sessions/sign-in';
registerComponent('SignIn', SignIn);