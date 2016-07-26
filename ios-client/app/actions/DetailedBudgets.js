import {
  DETAILED_BUDGET_UPDATED,
  DETAILED_BUDGET_CATEGORY_UPDATED,
  DETAILED_BUDGET_DATE_UPDATED,
  DETAILED_BUDGET_ITEM_ADDED,
  DETAILED_BUDGET_ITEM_UPDATED,
  DETAILED_BUDGET_ITEM_DELETED,
} from '../constants/ActionTypes'

export function updateBudget(budget) {
  return {
    type: DETAILED_BUDGET_UPDATED,
    budget,
    allocation_plans: budget.allocation_plans,
  }
}

export function updateBudgetCategory(budgetCategory) {
  return {
    type: DETAILED_BUDGET_CATEGORY_UPDATED,
    budgetCategory,
    budgetItems: budgetCategory.budget_items,
  }
}

export function updateBudgetDate(year,month) {
  return {
    type: DETAILED_BUDGET_DATE_UPDATED,
    year,
    month,
  }
}

// Items
export function addBudgetItem(budgetItem) {
  return {
    type: DETAILED_BUDGET_ITEM_ADDED,
    budgetItem
  }
}

export function updateBudgetItem(budgetItem) {
  return {
    type: DETAILED_BUDGET_ITEM_UPDATED,
    budgetItem
  }
}

export function deleteBudgetItem(budgetItem) {
  return {
    type: DETAILED_BUDGET_ITEM_DELETED,
    budgetItem
  }
}
