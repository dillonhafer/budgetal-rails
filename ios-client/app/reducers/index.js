import { combineReducers } from 'redux'

import navigationState from './Navigation'
import annualBudgetState from './AnnualBudgets'
import budgetState from './Budgets'
import sessionState from './Sessions'
import accountState from './Account'
import statisticsState from './Statistics'
import detailedBudgetState from './DetailedBudgets'

const appReducers = combineReducers({
	navigationState,
	budgetState,
	annualBudgetState,
	sessionState,
	accountState,
  statisticsState,
  detailedBudgetState,
})

export default appReducers
