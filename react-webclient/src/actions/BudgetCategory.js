import {
  BUDGET_UPDATED,
  BUDGET_CATEGORY_UPDATED,
  BUDGET_CATEGORY_IMPORTED,
  BUDGET_DATE_UPDATED,
  BUDGET_ITEM_ADDED,
  BUDGET_ITEM_UPDATED,
  BUDGET_ITEM_DELETED,
  BUDGET_ITEM_EXPENSE_ADDED,
  BUDGET_ITEM_EXPENSE_UPDATED,
  BUDGET_ITEM_EXPENSE_DELETED,
} from '../constants/ActionTypes'
import {flatten, map} from 'lodash'

export function updateBudget(data) {
  return {
    type: BUDGET_UPDATED,
    ...data,
  }
}

export function updateBudgetCategory(budgetCategory) {
  return {
    type: BUDGET_CATEGORY_UPDATED,
    budgetCategory,
  }
}

export function updateBudgetDate(year,month) {
  return {
    type: BUDGET_DATE_UPDATED,
    year,
    month,
  }
}

export function budgetCategoryImported(budgetItems) {
  return {
    type: BUDGET_CATEGORY_IMPORTED,
    budgetItems
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
