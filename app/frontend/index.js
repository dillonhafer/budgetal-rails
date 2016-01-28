import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import {showMessage} from './utils/flash-box';
import {userAuthenticated} from './utils/helpers';
window.showMessage = showMessage;

import './assets/stylesheets/app';

import CashFlowPlans from './components/cashFlowPlans/cash_flow_plans';
import AllocationPlans from './components/allocationPlans/allocation-plans';
import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
import Statistics from './components/statistics/statistics';
import Sessions from './components/sessions/sessions';
import Footer from './components/layout/footer';
import Nav from './components/layout/nav';
import NotFound from './components/layout/not-found';
import Home from './components/home/home';
import Privacy from './components/home/privacy';
import Admin from './components/admin/admin';
import AccountSettings from './components/account-settings/account-settings';

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

function requireAuth(nextState, replace) {
  if (!userAuthenticated()) {
    replace(null, '/', null);
    showMessage('You need to sign in.');
  }
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="privacy" component={Privacy} />
      <Route path="budgets/:year/:month" component={CashFlowPlans} onEnter={requireAuth} />
      <Route path='detailed-budgets/:year/:month' component={AllocationPlans} onEnter={requireAuth} />
      <Route path='annual-budgets/:year' component={AnnualBudgetItems} onEnter={requireAuth} />
      <Route path='monthly-statistics/:year/:month' component={Statistics} onEnter={requireAuth} />
      <Route path='account-settings' component={AccountSettings} onEnter={requireAuth} />
      <Route path='admin' component={Admin} onEnter={requireAuth} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('main'))
