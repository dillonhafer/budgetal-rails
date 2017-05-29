import {
  BUDGET_ITEM_EXPENSE_NEW,
  BUDGET_ITEM_EXPENSE_SAVED,
  BUDGET_ITEM_EXPENSE_IMPORTED,
  BUDGET_ITEM_EXPENSE_UPDATED,
  BUDGET_ITEM_EXPENSE_DELETED,
} from '../constants/ActionTypes'

export function newBudgetItemExpense(budgetItemId) {
  return {
    type: BUDGET_ITEM_EXPENSE_NEW,
    budgetItemId
  }
}

export function saveBudgetItemExpense(budgetItemExpense) {
  return {
    type: BUDGET_ITEM_EXPENSE_SAVED,
    budgetItemExpense
  }
}

export function importBudgetItemExpense(budgetItemExpense) {
  return {
    type: BUDGET_ITEM_EXPENSE_IMPORTED,
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
