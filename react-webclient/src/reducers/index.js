import { combineReducers } from 'redux'

import budgetState from './Budgets'

const appReducers = combineReducers({
	budgetState,
})

export default appReducers
