import {
  BUDGET_UPDATED,
  BUDGET_CATEGORY_UPDATED,
  BUDGET_CATEGORY_IMPORTED,
  BUDGET_DATE_UPDATED,
  BUDGET_ITEM_NEW,
  BUDGET_ITEM_SAVED,
  BUDGET_ITEM_UPDATED,
  BUDGET_ITEM_DELETED,
  BUDGET_ITEM_MOVED,
  BUDGET_ITEM_EXPENSE_NEW,
  BUDGET_ITEM_EXPENSE_SAVED,
  BUDGET_ITEM_EXPENSE_UPDATED,
  BUDGET_ITEM_EXPENSE_DELETED,
} from '../constants/ActionTypes'

import {today} from '../utils/helpers';
import {findIndex} from 'lodash';

const initialBudgetState = {
	budget: {
		year: new Date().getFullYear(),
		month: new Date().getMonth()+1,
		budget_categories: [
      {name: 'Charity'},
      {name: 'Saving'},
      {name: 'Housing'},
      {name: 'Utilities'},
      {name: 'Food'},
      {name: 'Clothing'},
      {name: 'Transportation'},
      {name: 'Medical/Health'},
      {name: 'Insurance'},
      {name: 'Personal'},
      {name: 'Recreation'},
      {name: 'Debts'}
    ],
    monthly_income: 0.00
	},
  budgetCategory: {
    id: 0,
    name: 'Charity',
    amount: '',
    budget_items: [],
  },
	budgetCategories: [],
	budgetItems: [],
	budgetItemExpenses: [],
}

export default function budgetState(state = initialBudgetState, action) {
	switch (action.type) {
	case BUDGET_UPDATED:
		return {
			...state,
      ...action,
		}
	case BUDGET_CATEGORY_UPDATED:
		return {
			...state,
			budgetCategory: action.budgetCategory,
		}
  case BUDGET_CATEGORY_IMPORTED:
    return {
      ...state,
      budgetItems: [...state.budgetItems, ...action.budgetItems]
    }
	case BUDGET_DATE_UPDATED:
		return {
			...state,
      budget: Object.assign({}, state.budget, action)
		}
  case BUDGET_ITEM_NEW:
    return {
      ...state,
			budgetItems: [...state.budgetItems, {budget_category_id: state.budgetCategory.id, name: 'New Item', amount_budgeted: 0}]
    }
  case BUDGET_ITEM_SAVED:
    let savedBudgetItems = state.budgetItems.map((item, i) => {
      if (item.id === undefined) {
        return action.budgetItem
      }
      return item;
    })
    return {...state, budgetItems: savedBudgetItems}
	case BUDGET_ITEM_UPDATED:
		let budgetItems = state.budgetItems.map((item, i) => {
      if (item.id === action.budgetItem.id && item.budget_category_id === action.budgetItem.budget_category_id) {
        return action.budgetItem
      }
			return item
    })
		return {...state, budgetItems}
  case BUDGET_ITEM_MOVED:
    budgetItems = state.budgetItems.map((item, i) => {
      if (item.id === action.budgetItem.id && item.budget_category_id === action.budgetItem.budget_category_id) {
        return Object.assign({}, action.budgetItem, {budget_category_id: action.budgetCategoryId})
      }
      return item
    })
    return {...state, budgetItems}
	case BUDGET_ITEM_DELETED:
    const deleteIdx = findIndex(state.budgetItems, (item) => {return (item.id === action.budgetItem.id && item.budget_category_id === action.budgetItem.budget_category_id)});
		return {
			...state,
			budgetItems: [
		    ...state.budgetItems.slice(0, deleteIdx),
		    ...state.budgetItems.slice(deleteIdx + 1)
			],
		}
	case BUDGET_ITEM_EXPENSE_NEW:
    return {
      ...state,
			budgetItemExpenses: [...state.budgetItemExpenses, {budget_item_id: action.budgetItemId, amount: 0, name: '', date: today()}]
    }
	case BUDGET_ITEM_EXPENSE_SAVED:
    let budgetItemExpenses = state.budgetItemExpenses.map((expense, i) => {
      if (expense.id === undefined && expense.budget_item_id === action.budgetItemExpense.budget_item_id) {
        // Copy the object before mutating
        return Object.assign({}, expense, action.budgetItemExpense)
      }
      return expense
    })
    return {...state, budgetItemExpenses}
	case BUDGET_ITEM_EXPENSE_UPDATED:
		budgetItemExpenses = state.budgetItemExpenses.map((expense, i) => {
			if (expense.id === action.budgetItemExpense.id && expense.budget_item_id === action.budgetItemExpense.budget_item_id) {
				// Copy the object before mutating
				return Object.assign({}, expense, action.budgetItemExpense)
			}
			return expense
		})
		return {...state, budgetItemExpenses}
	case BUDGET_ITEM_EXPENSE_DELETED:
		const deleteExpenseIdx = findIndex(state.budgetItemExpenses, (expense) => {return (expense.id === action.budgetItemExpense.id && expense.budget_item_id === action.budgetItemExpense.budget_item_id)});
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
