import { combineReducers } from 'redux'

import navigationState from './reducers/Navigation'
import annualBudgetState from './reducers/AnnualBudgets'
import budgetState from './reducers/Budgets'

const appReducers = combineReducers({
	navigationState,
	budgetState,
	annualBudgetState,
})

export default appReducers
