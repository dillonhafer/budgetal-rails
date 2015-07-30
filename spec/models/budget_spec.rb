require 'rails_helper'

describe Budget do
  let(:budget) { FactoryGirl.create :budget, :with_budget_items }

  describe '#total_expenses' do
    it 'calculates the total amount spent' do
      budget_item = budget.budget_items.first
      FactoryGirl.create :budget_item_expense, budget_item: budget_item, amount: 21.21
      FactoryGirl.create :budget_item_expense, budget_item: budget_item, amount: 21.21
      expect(budget.total_expenses).to eq 42.42
    end
  end

  describe '#difference' do
    it 'calculates the difference of income and expenses' do
    end
  end
end
