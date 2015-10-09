require 'rails_helper'

describe BudgetItem do
  let(:user)   { FactoryGirl.create :user }
  let(:budget) { FactoryGirl.create :budget, :with_budget_items, user: user }
  let(:budget_item) { budget.budget_items.first }
  let(:plan) { budget.allocation_plans.create }

  describe '#amount_allocated' do
    it 'returns the amount allocated to allocation plans' do
      plan.allocation_plan_budget_items.create(amount_budgeted: 25.00, budget_item: budget_item)
      expect(budget_item.amount_allocated).to eq(25.00)
    end
  end

  describe '#remaining_allocations' do
    it 'returns the amount left to allocate in an allocation plan' do
      plan.allocation_plan_budget_items.create(amount_budgeted: 25.00, budget_item: budget_item)
      expect(budget_item.remaining_allocations).to eq(375.00)
    end
  end
end
