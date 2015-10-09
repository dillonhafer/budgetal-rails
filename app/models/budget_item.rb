class BudgetItem < ActiveRecord::Base
  belongs_to :budget_category
  has_many :budget_item_expenses
  has_many :allocation_plan_budget_items
  accepts_nested_attributes_for :budget_item_expenses, allow_destroy: true
  validates_presence_of :budget_category_id, :amount_budgeted, :name

  default_scope -> { order(:id) }

  def amount_spent
    budget_item_expenses.sum(:amount)
  end

  def amount_remaining
    amount_budgeted - amount_spent
  end

  def amount_allocated
    allocation_plan_budget_items.sum(:amount_budgeted)
  end

  def remaining_allocations
    amount_budgeted - amount_allocated
  end
end
