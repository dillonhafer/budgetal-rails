import {
  STAT_BUDGET_UPDATED,
  STAT_BUDGET_DATE_UPDATED,
} from '../constants/ActionTypes'

export function updateStats(budget) {
  return {
    type: STAT_BUDGET_UPDATED,
    budget,
    budgetCategories: budget.budget_categories,
  }
}

export function updateBudgetDate(year,month) {
  return {
    type: STAT_BUDGET_DATE_UPDATED,
    year,
    month,
  }
}
