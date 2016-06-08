import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'

import { NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET, NAV_REPLACE_AT_INDEX } from './actions'
import { BUDGET_UPDATED, BUDGET_DATE_UPDATED, BUDGET_CATEGORY_UPDATED, BUDGET_ITEM_UPDATED, BUDGET_ITEM_ADDED } from './budgetActions'

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
		month: new Date().getMonth()+2,
		budget_categories: [],
	},
	budgetCategories: [],
	budgetItems: [],
	budgetItem_expenses: []
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
	default:
		return state
	}
}

const appReducers = combineReducers({
	navigationState,
	budgetState
})

export default appReducers
