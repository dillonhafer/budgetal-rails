import {
  ANNUAL_BUDGET_UPDATED,
  ANNUAL_BUDGET_DATE_UPDATED,
  ANNUAL_BUDGET_ITEM_ADDED,
  ANNUAL_BUDGET_ITEM_UPDATED,
  ANNUAL_BUDGET_ITEM_DELETED,
} from './annualBudgetActions'
import {findIndex} from 'lodash-node'

const initialAnnualBudgetState = {
	key: 'AnnualBudgets',
	year: new Date().getFullYear(),
	budgetItems: [],
}

export default function annualBudgetState(state = initialAnnualBudgetState, action) {
	switch (action.type) {
	case ANNUAL_BUDGET_UPDATED:
		return {
			...state,
      budget: action.budget,
      year: action.budget.year,
			budgetItems: action.budgetItems,
		}
	case ANNUAL_BUDGET_DATE_UPDATED:
		return {
			...state,
			year: action.year
		}
	case ANNUAL_BUDGET_ITEM_ADDED:
		return {
			...state,
			budgetItems: [...state.budgetItems, action.budgetItem]
		}
	case ANNUAL_BUDGET_ITEM_UPDATED:
		let budgetItems = state.budgetItems.map((item, i) => {
      if (item.id === action.budgetItem.id) {
        // Copy the object before mutating
        return Object.assign({}, item, action.budgetItem)
      }
			return item
    })
		return {...state, budgetItems}
	case ANNUAL_BUDGET_ITEM_DELETED:
		let deleteIdx = findIndex(state.budgetItems, {'id': action.budgetItem.id});
		return {
			...state,
			budgetItems: [
		    ...state.budgetItems.slice(0, deleteIdx),
		    ...state.budgetItems.slice(deleteIdx + 1)
			],
		}
	default:
		return state
	}
}
