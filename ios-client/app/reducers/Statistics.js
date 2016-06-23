import {
  STAT_BUDGET_UPDATED,
  STAT_BUDGET_DATE_UPDATED,
} from '../constants/ActionTypes'

const initialStatisticState = {
	key: 'Statistics',
	budget: {
		year: new Date().getFullYear(),
		month: new Date().getMonth()+1,
		budget_categories: [],
	},
	budgetCategories: [],
}

export default function statisticsState(state = initialStatisticState, action) {
	switch (action.type) {
	case STAT_BUDGET_UPDATED:
		return {
			...state,
			budget: action.budget,
			budgetCategories: action.budgetCategories,
		}
  case STAT_BUDGET_DATE_UPDATED:
		return {
			...state,
      budget: Object.assign({}, state.budget, action)
		}
	default:
		return state
	}
}
