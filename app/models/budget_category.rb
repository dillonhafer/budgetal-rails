class BudgetCategory < ActiveRecord::Base
  belongs_to :budget
  has_many :budget_items
  has_many :budget_item_expenses, through: :budget_items
  accepts_nested_attributes_for :budget_items, allow_destroy: true
  validates_presence_of :budget_id, :name, :percentage

  def total_spent
    budget_item_expenses.sum(:amount).to_f
  end

  def budget_remaining
    self.budget_items.sum(:amount_budgeted) - self.total_spent
  end

  def percent_used
    percent = self.total_spent / self.budget_items.sum(:amount_budgeted) * 100
    percent > 100 ? 100 : percent
  end

  def percent_of_budget
    if budget.monthly_income.to_f > 0.0
      (budget_items.sum(:amount_budgeted).to_f / budget.monthly_income.to_f * 100).round 
    else
      0
    end
  end
end
