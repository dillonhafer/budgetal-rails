class BudgetItemExpense < ActiveRecord::Base
  belongs_to :budget_item
  validates_presence_of :budget_item_id, :amount, :name, :date

  default_scope -> { order('date ASC') }
end
