import { combineReducers } from 'redux'

import navigationState from './Navigation'
import annualBudgetState from './AnnualBudgets'
import budgetState from './Budgets'
import sessionState from './Sessions'
import accountState from './Account'

const appReducers = combineReducers({
	navigationState,
	budgetState,
	annualBudgetState,
	sessionState,
	accountState,
})

export default appReducers
