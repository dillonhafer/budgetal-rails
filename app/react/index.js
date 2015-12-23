import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import CashFlowPlans from './components/CashFlowPlans/cash_flow_plans';
registerComponent('CashFlowPlans', CashFlowPlans);