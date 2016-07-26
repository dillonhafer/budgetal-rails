import {
  DETAILED_BUDGET_UPDATED,
  DETAILED_BUDGET_CATEGORY_UPDATED,
  DETAILED_BUDGET_DATE_UPDATED,
  DETAILED_BUDGET_ITEM_ADDED,
  DETAILED_BUDGET_ITEM_UPDATED,
  DETAILED_BUDGET_ITEM_DELETED,
} from '../constants/ActionTypes'

import {findIndex} from 'lodash-node';

const initialBudgetState = {
	key: 'DetailedBudget',
  budget: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
  },
	allocation_plans: [],
	allocation_plan: {
		budget_categories: [],
	},
	budgetCategories: [],
	budgetItems: [],
}

export default function detailedBudgetState(state = initialBudgetState, action) {
	switch (action.type) {
	case DETAILED_BUDGET_UPDATED:
		return {
			...state,
      budget: action.budget,
			allocation_plans: action.allocation_plans,
		}
	case DETAILED_BUDGET_CATEGORY_UPDATED:
		return {
			...state,
			budgetCategory: action.budgetCategory,
			budgetItems: action.budgetItems,
			budgetItemExpenses: action.budgetItemExpenses,
		}
	case DETAILED_BUDGET_DATE_UPDATED:
		return {
			...state,
      budget: Object.assign({}, state.budget, action)
		}
	case DETAILED_BUDGET_ITEM_ADDED:
		return {
			...state,
			budgetItems: [...state.budgetItems, action.budgetItem]
		}
	case DETAILED_BUDGET_ITEM_UPDATED:
		let budgetItems = state.budgetItems.map((item, i) => {
      if (item.id === action.budgetItem.id) {
        // Copy the object before mutating
        return Object.assign({}, item, action.budgetItem)
      }
			return item
    })
		return {...state, budgetItems}
	case DETAILED_BUDGET_ITEM_DELETED:
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
