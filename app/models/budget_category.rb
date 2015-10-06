class BudgetCategory < ActiveRecord::Base
  belongs_to :budget
  has_many :budget_items
  has_many :budget_item_expenses, through: :budget_items
  accepts_nested_attributes_for :budget_items, allow_destroy: true
  validates_presence_of :budget_id, :name, :percentage

  def total_spent
    budget_item_expenses.sum(:amount).to_f
  end

  def total_budgeted
    budget_items.sum(:amount_budgeted).to_f
  end

  def budget_remaining
    self.budget_items.sum(:amount_budgeted) - self.total_spent
  end

  def percent_used
    percent = self.total_spent / self.total_budgeted * 100
    percent > 100 ? 100 : percent
  end

  def percent_of_budget
    if budget.monthly_income.to_f > 0.0
      (total_budgeted / budget.monthly_income.to_f * 100).round
    else
      0
    end
  end

  def copy_previous_items
    previous_items.map do |item|
      budget_items.create(name: item.name, amount_budgeted: item.amount_budgeted)
    end
  end

  def import_count
    previous_items.count
  end

  def previous_items
    category_date = Date.new(budget.year.to_i, budget.month.to_i)
    previous_date = category_date.advance(months: -1)
    previous_budget = Budget.find_by(year: previous_date.year.to_s, month: previous_date.month.to_s, user_id: budget.user_id)
    previous_budget.budget_categories.find_by(name: name).budget_items
  end
end
