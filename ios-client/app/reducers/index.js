import { combineReducers } from 'redux'

import navigationState from './Navigation'
import annualBudgetState from './AnnualBudgets'
import budgetState from './Budgets'
import sessionState from './Sessions'

const appReducers = combineReducers({
	navigationState,
	budgetState,
	annualBudgetState,
	sessionState,
})

export default appReducers
