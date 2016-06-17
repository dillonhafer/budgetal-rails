import {
  ANNUAL_BUDGET_UPDATED,
  ANNUAL_BUDGET_DATE_UPDATED,
  ANNUAL_BUDGET_ITEM_ADDED,
  ANNUAL_BUDGET_ITEM_UPDATED,
  ANNUAL_BUDGET_ITEM_DELETED,
} from '../constants/ActionTypes'

import {flatten, map} from 'lodash-node'

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
