require 'rails_helper'

describe BudgetCategory do
  let(:user)   { FactoryGirl.create :user }
  let(:budget) { FactoryGirl.create :budget, :with_budget_items, user: user }
  let(:budget_category) { budget.budget_categories.first }

  describe '#total_spent' do
    it 'returns the total amount spent in the category' do
      FactoryGirl.create :budget_item_expense, amount: 35.00, budget_item: budget_category.budget_items.first
      expect(budget_category.total_spent).to eq(35.00)
    end
  end

  describe '#total_budgeted' do
    it 'returns the total amount budgeted in the category' do
      expect(budget_category.total_budgeted).to eq(400.00)
    end
  end

  describe '#budget_remaining' do
    it 'returns the amount left to spend for the category' do
      FactoryGirl.create :budget_item_expense, amount: 50.00, budget_item: budget_category.budget_items.first
      expect(budget_category.budget_remaining).to eq(350.00)
    end
  end

  describe '#percent_used' do
    it 'returns the percentage used of the category' do
      FactoryGirl.create :budget_item_expense, amount: 200.00, budget_item: budget_category.budget_items.first
      expect(budget_category.percent_used).to eq(50)
    end

    it 'returns 100 if greater than 100' do
      FactoryGirl.create :budget_item_expense, amount: 2000.00, budget_item: budget_category.budget_items.first
      expect(budget_category.percent_used).to eq(100)
    end
  end

  describe '#percent_of_budget' do
    it 'returns the percentage allocated out of the monthly income' do
      budget.update_attribute :monthly_income, 800.00
      expect(budget_category.percent_of_budget).to eq(50)
    end

    it 'returns 0 if there is no monthly income' do
      budget.update_attribute :monthly_income, 0.00
      expect(budget_category.percent_of_budget).to eq(0)
    end
  end

  describe 'previous items' do
    let(:previous_month)    { Date.new(budget.year.to_i, budget.month.to_i).advance(months: -1).month }
    let!(:previous_budget)   { FactoryGirl.create(:budget, :with_budget_items, month: previous_month, user: user) }
    let(:previous_category) { previous_budget.budget_categories.first }

    describe '#copy_previous_items' do
      it 'creates budget items from last months budget category' do
        expect {
          budget_category.copy_previous_items
        }.to change {budget_category.budget_items.count}.by (previous_category.budget_items.count)
      end
    end

    describe '#previous_items' do
      it 'returns budget items in the category from the previous month' do
        expect(budget_category.previous_items).to eq(previous_category.budget_items)
      end
    end
  end
end
