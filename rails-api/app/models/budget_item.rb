class BudgetItem < ApplicationRecord
  belongs_to :budget_category
  has_many :budget_item_expenses, dependent: :destroy
  has_many :allocation_plan_budget_items, dependent: :destroy
  validates_presence_of :budget_category_id, :amount_budgeted, :name
  validates :amount_budgeted, numericality: { greater_than: 0.00}

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

  def allocation_item_from(collection)
    collection.detect {|item| item.budget_item_id == id} || OpenStruct.new(id: '', amount_budgeted: 0.00)
  end
end
