import 'babel-polyfill';
import './assets/stylesheets/theme.sass';
import React from 'react';
import ReactDOM from 'react-dom';
import { showMessage, showError } from './utils/flash-box';
import { userAuthenticated } from './utils/helpers';
import AllocationPlans from './components/allocationPlans/allocation-plans';
import AnnualBudgetItems from './components/annualBudgetItems/annual_budget';
import Statistics from './components/statistics/statistics';
import Sessions from './components/sessions/sessions';
import PasswordReset from './components/sessions/PasswordReset';
import NotFound from './components/layout/not-found';
import Maintenance from './components/layout/maintenance';
import Home from './components/home/home';
import Privacy from './components/home/privacy';
import Admin from './components/admin/admin';
import AccountSettings from './components/account-settings/account-settings';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import BudgetContainer from './containers/BudgetContainer';
import MortgageCalculator from './containers/MortgageCalculatorContainer';

import { throttle } from 'lodash';
import { loadState, saveState } from './utils/PersistantState';
const persistedState = loadState();

const store = createStore(reducers, { mortgageCalculator: persistedState });
store.subscribe(
  throttle(() => {
    saveState(store.getState().mortgageCalculator);
  }, 1000)
);

import App from './components/app';

window.React = React;
window.ReactDOM = ReactDOM;
window.showMessage = showMessage;
window.showError = showError;
window.apiError = function(message) {
  if (message.message) {
    showError(message.message);
  } else {
    showError(message);
  }
  browserHistory.replace('/');
};

function requireAuth(nextState, replace) {
  if (!userAuthenticated()) {
    replace(null, '/', null);
    showError('You need to sign in.');
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="privacy" component={Privacy} />
        <Route
          path="budgets/:year/:month"
          component={BudgetContainer}
          onEnter={requireAuth}
        />
        <Route
          path="detailed-budgets/:year/:month"
          component={AllocationPlans}
          onEnter={requireAuth}
        />
        <Route
          path="annual-budgets/:year"
          component={AnnualBudgetItems}
          onEnter={requireAuth}
        />
        <Route
          path="monthly-statistics/:year/:month"
          component={Statistics}
          onEnter={requireAuth}
        />
        <Route
          path="account-settings"
          component={AccountSettings}
          onEnter={requireAuth}
        />
        <Route path="reset-password" component={PasswordReset} />
        <Route path="calculators/mortgage" component={MortgageCalculator} />
        <Route path="admin" component={Admin} onEnter={requireAuth} />
        <Route path="503" component={Maintenance} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
