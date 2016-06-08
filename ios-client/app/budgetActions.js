// *** Action Types ***
export const BUDGET_UPDATED = 'BUDGET_UPDATED'

// *** Action Creators ***
export function updateBudget(budget) {
  console.log('action budget')
  return {
    type: BUDGET_UPDATED,
    budgetDate: new Date(budget.year, budget.month-1,1,1,1,1,1),
    budget,
  }
}
