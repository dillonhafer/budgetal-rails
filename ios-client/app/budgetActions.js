// *** Action Types ***
export const BUDGET_UPDATED = 'BUDGET_UPDATED'
export const BUDGET_CATEGORY_UPDATED = 'BUDGET_CATEGORY_UPDATED'
export const BUDGET_DATE_UPDATED = 'BUDGET_DATE_UPDATED'
export const BUDGET_ITEM_UPDATED = 'BUDGET_ITEM_UPDATED'
export const BUDGET_ITEM_ADDED = 'BUDGET_ITEM_ADDED'

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
    budgetItems: budgetCategory.budget_items
  }
}

export function updateBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_UPDATED,
    budgetItem
  }
}

export function addBudgetItem(budgetItem) {
  return {
    type: BUDGET_ITEM_ADDED,
    budgetItem
  }
}

export function updateBudgetDate(date) {
  return {
    type: BUDGET_DATE_UPDATED,
    budgetDate: date,
  }
}
