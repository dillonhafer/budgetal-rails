import { expect } from '../test_helper';

import * as types from '../../src/constants/ActionTypes';
import { updateBudget } from '../../src/actions/BudgetCategory';

describe('actions', () => {
  const budget = {
    id: 37
  };

  describe('updateBudget', () => {
    it('has the correct type', () => {
      const action = updateBudget({budget});
      expect(action.type).toEqual(types.BUDGET_UPDATED)
    });

    it('has the correct budget', () => {
      const action = updateBudget({budget});
      expect(action.budget.id).toEqual(37)
    });

    it('has the correct expenses', () => {
      const action = updateBudget({budget, budgetItemExpenses: [1,2,3]});
      expect(action.budgetItemExpenses).toEqual([1,2,3])
    });
  });
});
