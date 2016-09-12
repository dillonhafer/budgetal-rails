import {
  BUDGET_ITEM_NEW,
  BUDGET_ITEM_SAVED,
  BUDGET_ITEM_UPDATED,
  BUDGET_ITEM_DELETED,
  BUDGET_ITEM_MOVED,
} from '../constants/ActionTypes'

export function newBudgetItem() {
  return {
    type: BUDGET_ITEM_NEW
  }
}

export function saveBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_SAVED,
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

export function moveBudgetItem(budgetCategoryId, budgetItem) {
  return {
    type: BUDGET_ITEM_MOVED,
    budgetItem,
    budgetCategoryId
  }
}
