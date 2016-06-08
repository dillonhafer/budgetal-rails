// *** Action Types ***
export const BUDGET_UPDATED = 'BUDGET_UPDATED'

// *** Action Creators ***
export function updateBudget(budget) {
  return {
    type: BUDGET_UPDATED,
    budgetDate: new Date([budget.year, budget.month,1].join('-')),
    budget,
  }
}
