import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import {showMessage} from './utils/flash-box';
window.showMessage = showMessage;

import './assets/stylesheets/app';

import CashFlowPlans from './components/cashFlowPlans/cash_flow_plans';
import AllocationPlans from './components/allocationPlans/allocation-plans';
import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
import Statistics from './components/statistics/statistics';
import Sessions from './components/sessions/sessions';
import Footer from './components/layout/footer';
import Nav from './components/layout/nav';
import Home from './components/home/home';
import Privacy from './components/home/privacy';

document.addEventListener('DOMContentLoaded', function() {
  var box = document.querySelector('.flash-box');
  if (box) {
   var message = box.innerHTML;
   box.parentNode.removeChild(box);
   showMessage(message);
  }
});

import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import logo from './assets/images/logo.png';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200} >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
        <Footer />
      </div>
    )
  }
}

import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="privacy" component={Privacy} />
      <Route path="cash-flow-plans/:year/:month" component={CashFlowPlans} />
      <Route path='allocation-plans/:year/:month' component={AllocationPlans} />
      <Route path='annual-budgets/:year' component={AnnualBudgetItems} />
      <Route path='monthly-statistics/:year/:month' component={Statistics} />
    </Route>
  </Router>
), document.getElementById('main'))