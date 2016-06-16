import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'

import annualBudgetState from './annualBudgetReducer'

import { NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET, NAV_REPLACE_AT_INDEX } from './actions'
import {
	BUDGET_UPDATED,
	BUDGET_DATE_UPDATED,
	BUDGET_CATEGORY_UPDATED,
	BUDGET_ITEM_UPDATED,
	BUDGET_ITEM_ADDED,
	BUDGET_ITEM_DELETED,
	BUDGET_ITEM_EXPENSE_ADDED,
	BUDGET_ITEM_EXPENSE_UPDATED,
	BUDGET_ITEM_EXPENSE_DELETED
} from './budgetActions'

import {findIndex} from 'lodash-node'

const initialNavState = {
	key: 'MainNavigation',
	index: 0,
	children: [
		{ key: 'SignIn', title: '' },
	],
}

function navigationState(state = initialNavState, action) {
	switch (action.type) {
	case NAV_PUSH:
		if (state.children[state.index].key === (action.state && action.state.key)) return state
		return NavigationStateUtils.push(state, action.state)

	case NAV_POP:
		if (state.index === 0 || state.children.length === 1) return state
		return NavigationStateUtils.pop(state)

	case NAV_JUMP_TO_KEY:
		return NavigationStateUtils.jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return NavigationStateUtils.jumpToIndex(state, action.index)

	case NAV_REPLACE_AT_INDEX:
		return NavigationStateUtils.replaceAtIndex(state, action.index, action.newState)

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			children: action.children
		}

	default:
		return state
	}
}

const initialBudgetState = {
	key: 'Budget',
	budgetDate: new Date(),
	budget: {
		year: new Date().getFullYear(),
		month: new Date().getMonth()+1,
		budget_categories: [],
	},
	budgetCategories: [],
	budgetItems: [],
	budgetItemExpenses: [],
}

function budgetState(state = initialBudgetState, action) {
	switch (action.type) {
	case BUDGET_UPDATED:
		return {
			...state,
			budget: action.budget,
			budgetCategories: action.budget.budget_categories,
			budgetDate: action.budgetDate
		}

	case BUDGET_CATEGORY_UPDATED:
		return {
			...state,
			budgetCategory: action.budgetCategory,
			budgetItems: action.budgetItems,
			budgetItemExpenses: action.budgetItemExpenses,
		}
	case BUDGET_DATE_UPDATED:
		return {
			...state,
			budgetDate: action.budgetDate
		}
	case BUDGET_ITEM_ADDED:
		return {
			...state,
			budgetItems: [...state.budgetItems, action.budgetItem]
		}
	case BUDGET_ITEM_UPDATED:
		let budgetItems = state.budgetItems.map((item, i) => {
      if (item.id === action.budgetItem.id) {
        // Copy the object before mutating
        return Object.assign({}, item, action.budgetItem)
      }
			return item
    })
		return {...state, budgetItems}
	case BUDGET_ITEM_DELETED:
		let deleteIdx = findIndex(state.budgetItems, {'id': action.budgetItem.id});
		return {
			...state,
			budgetItems: [
		    ...state.budgetItems.slice(0, deleteIdx),
		    ...state.budgetItems.slice(deleteIdx + 1)
			],
		}
	case BUDGET_ITEM_EXPENSE_ADDED:
		return {
			...state,
			budgetItemExpenses: [...state.budgetItemExpenses, action.budgetItemExpense]
		}
	case BUDGET_ITEM_EXPENSE_UPDATED:
		let budgetItemExpenses = state.budgetItemExpenses.map((expense, i) => {
			if (expense.id === action.budgetItemExpense.id) {
				// Copy the object before mutating
				return Object.assign({}, expense, action.budgetItemExpense)
			}
			return expense
		})
		return {...state, budgetItemExpenses}
	case BUDGET_ITEM_EXPENSE_DELETED:
		let deleteExpenseIdx = findIndex(state.budgetItemExpenses, {'id': action.budgetItemExpense.id});
		return {
			...state,
			budgetItemExpenses: [
		    ...state.budgetItemExpenses.slice(0, deleteExpenseIdx),
		    ...state.budgetItemExpenses.slice(deleteExpenseIdx + 1)
			],
		}
	default:
		return state
	}
}

const appReducers = combineReducers({
	navigationState,
	budgetState,
annualBudgetState
})

export default appReducers
