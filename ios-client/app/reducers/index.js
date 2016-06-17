import { combineReducers } from 'redux'

import navigationState from './Navigation'
import annualBudgetState from './AnnualBudgets'
import budgetState from './Budgets'

const appReducers = combineReducers({
	navigationState,
	budgetState,
	annualBudgetState,
})

export default appReducers
