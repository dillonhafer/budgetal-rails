import { combineReducers } from 'redux';

import budgetState from './Budgets';
import mortgageCalculator from './MortgageCalculator';

const appReducers = combineReducers({
  budgetState,
  mortgageCalculator,
});

export default appReducers;
