class Budget < ApplicationRecord
  belongs_to :user
  has_many :budget_categories, dependent: :destroy
  has_many :budget_items, through: :budget_categories
  has_many :budget_item_expenses, through: :budget_items
  has_many :allocation_plans, dependent: :destroy
  has_many :allocation_plan_budget_items, through: :budget_items

  validates_presence_of :monthly_income

  validates_numericality_of :month,
    only_integer: true,
    less_than_or_equal_to: 12,
    greater_than_or_equal_to: 1

  validates_numericality_of :year,
    only_integer: true,
    less_than_or_equal_to: 2200,
    greater_than_or_equal_to: 2013

  scope :ordered, -> { order(year: :desc, month: :desc) }

  def total_expenses
    budget_item_expenses.sum(:amount).to_f
  end

  def difference
    monthly_income-total_expenses
  end

  def self.create_template(month, year, user_id)
    budget = Budget.create(month: month, year: year, user_id: user_id, monthly_income: 4000.00)
    budget.budget_categories.create(name: 'Charity', percentage: '10-15%')
    budget.budget_categories.create(name: 'Saving', percentage: '10-15%')
    budget.budget_categories.create(name: 'Housing', percentage: '25-35%')
    budget.budget_categories.create(name: 'Utilities', percentage: '5-10%')
    budget.budget_categories.create(name: 'Food', percentage: '5-15%')
    budget.budget_categories.create(name: 'Clothing', percentage: '2-7%')
    budget.budget_categories.create(name: 'Transportation', percentage: '10-15%')
    budget.budget_categories.create(name: 'Medical/Health', percentage: '5-10%')
    budget.budget_categories.create(name: 'Insurance', percentage: '10-25%')
    budget.budget_categories.create(name: 'Personal', percentage: '5-10%')
    budget.budget_categories.create(name: 'Recreation', percentage: '5-10%')
    budget.budget_categories.create(name: 'Debts', percentage: '0%')
    budget
  end

  def pretty_date
    to_date.strftime("%B")
  end

  def amount_budgeted
    budget_items.sum(:amount_budgeted).to_f
  end

  def budget_remaining
    amount_budgeted - total_expenses
  end

  def amount_remaining
    monthly_income.to_f - amount_budgeted
  end

  def percent_spent
    spent = (total_expenses / amount_budgeted * 100).round(3)
    spent > 100 ? 100 : spent
  end

  def percent_used
    used = (100 - (amount_remaining / monthly_income.to_f * 100))
    used > 100 ? 100 : used
  end

  def to_date
    Date.new(year, month)
  end
end
