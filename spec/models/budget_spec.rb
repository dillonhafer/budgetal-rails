require 'rails_helper'

describe Budget do
  let(:budget) { FactoryGirl.create :budget, :with_budget_items }
  let(:user)   { FactoryGirl.create :user }

  describe '::create_template' do
    it 'creates templates' do
      budget_template = Budget.create_template(1, 2015, user.id)
      expect(budget_template.budget_categories.count).to eq(12)
    end

    it 'returns a budget' do
      budget_template = Budget.create_template(1, 2015, user.id)
      expect(budget_template).to be_persisted
    end
  end

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
      FactoryGirl.create :budget_item_expense, budget_item: budget.budget_items.first, amount: 99.25
      expect(budget.difference).to eq 4900.75
    end
  end

  describe '#amount_budgeted' do
    it 'sums the total amount budgeted' do
      FactoryGirl.create :budget_item, amount_budgeted: 22.55, budget_category: budget.budget_categories.first
      expect(budget.amount_budgeted).to eq(422.55)
    end
  end

  describe '#budget_remaining' do
    it 'returns the amount remaining to be spent of amount budgeted' do
      budget_item = budget.budget_items.first # 400.00
      FactoryGirl.create :budget_item_expense, budget_item: budget_item, amount: 21.21
      expect(budget.budget_remaining).to eq(378.79)
    end
  end

  describe '#amount_remaining' do
    it 'returns the amount of monthly income left to be allocated' do
      # 400 out of 5000
      expect(budget.amount_remaining).to eq(4600.00)
    end
  end

  describe '#percent_spent' do
    it 'returns the percentage spent of the amount budgeted' do
      budget_item = budget.budget_items.first # 400.00
      FactoryGirl.create :budget_item_expense, budget_item: budget_item, amount: 300.00
      expect(budget.percent_spent).to eq(75)
    end

    it 'returns 100 if greater than 100' do
      budget_item = budget.budget_items.first # 400.00
      FactoryGirl.create :budget_item_expense, budget_item: budget_item, amount: 500.00
      expect(budget.percent_spent).to eq(100)
    end
  end

  describe '#percent_used' do
    it 'returns the percentage used of the monthly income' do
      category = budget.budget_categories.first
      FactoryGirl.create :budget_item, amount_budgeted: 2100.00, budget_category: category
      expect(budget.percent_used).to eq(50)
    end

    it 'returns 100 if greater than 100' do
      category = budget.budget_categories.first
      FactoryGirl.create :budget_item, amount_budgeted: 5000.00, budget_category: category
      expect(budget.percent_used).to eq(100)
    end
  end
end
