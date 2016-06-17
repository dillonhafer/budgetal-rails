import {flatten, map} from 'lodash-node'

// *** Action Types ***
export const ANNUAL_BUDGET_UPDATED = 'ANNUAL_BUDGET_UPDATED'
export const ANNUAL_BUDGET_DATE_UPDATED = 'ANNUAL_BUDGET_DATE_UPDATED'
export const ANNUAL_BUDGET_ITEM_ADDED = 'ANNUAL_BUDGET_ITEM_ADDED'
export const ANNUAL_BUDGET_ITEM_UPDATED = 'ANNUAL_BUDGET_ITEM_UPDATED'
export const ANNUAL_BUDGET_ITEM_DELETED = 'ANNUAL_BUDGET_ITEM_DELETED'

// *** Action Creators ***
export function updateBudget(budget) {
  return {
    type: ANNUAL_BUDGET_UPDATED,
    budget,
    budgetItems: budget.annual_budget_items,
  }
}

export function updateBudgetYear(year) {
  return {
    type: ANNUAL_BUDGET_DATE_UPDATED,
    year
  }
}

// Items
export function addBudgetItem(budgetItem) {
  return {
    type: ANNUAL_BUDGET_ITEM_ADDED,
    budgetItem
  }
}

export function updateBudgetItem(budgetItem) {
  return {
    type: ANNUAL_BUDGET_ITEM_UPDATED,
    budgetItem
  }
}

export function deleteAnnualBudgetItem(budgetItem) {
  return {
    type: ANNUAL_BUDGET_ITEM_DELETED,
    budgetItem
  }
}
