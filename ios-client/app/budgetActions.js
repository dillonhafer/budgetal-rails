import {flatten, map} from 'lodash-node'

// *** Action Types ***
export const BUDGET_UPDATED = 'BUDGET_UPDATED'
export const BUDGET_CATEGORY_UPDATED = 'BUDGET_CATEGORY_UPDATED'
export const BUDGET_DATE_UPDATED = 'BUDGET_DATE_UPDATED'

export const BUDGET_ITEM_ADDED = 'BUDGET_ITEM_ADDED'
export const BUDGET_ITEM_UPDATED = 'BUDGET_ITEM_UPDATED'
export const BUDGET_ITEM_DELETED = 'BUDGET_ITEM_DELETED'

export const BUDGET_ITEM_EXPENSE_ADDED = 'BUDGET_ITEM_EXPENSE_ADDED'
export const BUDGET_ITEM_EXPENSE_UPDATED = 'BUDGET_ITEM_EXPENSE_UPDATED'
export const BUDGET_ITEM_EXPENSE_DELETED = 'BUDGET_ITEM_EXPENSE_DELETED'


// *** Action Creators ***
export function updateBudget(budget) {
  return {
    type: BUDGET_UPDATED,
    budgetDate: new Date([budget.year, budget.month,1].join('-')),
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

export function updateBudgetDate(date) {
  return {
    type: BUDGET_DATE_UPDATED,
    budgetDate: date,
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
