class BudgetCategory < ActiveRecord::Base
  belongs_to :budget
  has_many :budget_items, dependent: :destroy
  has_many :budget_item_expenses, through: :budget_items

  validates_presence_of :budget_id, :name, :percentage

  def total_spent
    budget_item_expenses.sum(:amount).to_f
  end

  def total_budgeted
    budget_items.sum(:amount_budgeted).to_f
  end

  def budget_remaining
    total_budgeted - total_spent
  end

  def percent_used
    percent = total_spent / total_budgeted * 100
    percent > 100 ? 100 : percent
  end

  def percent_of_budget
    percentage_of_budget_income(total_budgeted)
  end

  def percent_of_budget_spent
    percentage_of_budget_income(total_spent)
  end

  def copy_previous_items
    previous_items.map do |item|
      budget_items.create(name: item.name, amount_budgeted: item.amount_budgeted)
    end
  end

  def previous_items
    previous_budget.budget_categories.find_by(name: name).budget_items
  end

  private

  def percentage_of_budget_income(amount)
    return 0 if no_monthly_income?
    (amount / budget.monthly_income * 100).round(2).to_i
  end

  def no_monthly_income?
    budget.monthly_income < 0.01
  end

  def previous_budget
    relative_budget(months: -1)
  end

  def relative_budget(months:)
    previous_date = budget.to_date.advance(months: months)
    budget.user.budgets.find_by(year: previous_date.year, month: previous_date.month)
  end
end
