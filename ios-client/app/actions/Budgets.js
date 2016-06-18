import {
  BUDGET_UPDATED,
  BUDGET_CATEGORY_UPDATED,
  BUDGET_DATE_UPDATED,
  BUDGET_ITEM_ADDED,
  BUDGET_ITEM_UPDATED,
  BUDGET_ITEM_DELETED,
  BUDGET_ITEM_EXPENSE_ADDED,
  BUDGET_ITEM_EXPENSE_UPDATED,
  BUDGET_ITEM_EXPENSE_DELETED,
} from '../constants/ActionTypes'
import {flatten, map} from 'lodash-node'

export function updateBudget(budget) {
  return {
    type: BUDGET_UPDATED,
    budgetDate: new Date(budget.year, budget.month-1,1),
    budget,
  }
}

export function updateBudgetCategory(budgetCategory) {
  return {
    type: BUDGET_CATEGORY_UPDATED,
    budgetCategory,
    budgetItems: budgetCategory.budget_items,
    budgetItemExpenses: flatten(map(budgetCategory.budget_items, (item,a) => {return item.budget_item_expenses}))
  }
}

export function updateBudgetDate(year,month) {
  return {
    type: BUDGET_DATE_UPDATED,
    year,
    month,
  }
}

// Items
export function addBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_ADDED,
    budgetItem
  }
}

export function updateBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_UPDATED,
    budgetItem
  }
}

export function deleteBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_DELETED,
    budgetItem
  }
}

// Expenses
export function addBudgetItemExpense(budgetItemExpense) {
  return {
    type: BUDGET_ITEM_EXPENSE_ADDED,
    budgetItemExpense
  }
}

export function updateBudgetItemExpense(budgetItemExpense) {
  return {
    type: BUDGET_ITEM_EXPENSE_UPDATED,
    budgetItemExpense
  }
}

export function deleteBudgetItemExpense(budgetItemExpense) {
  return {
    type: BUDGET_ITEM_EXPENSE_DELETED,
    budgetItemExpense
  }
}
