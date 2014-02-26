class BudgetItemExpense < ActiveRecord::Base
  belongs_to :budget_item
  validates_presence_of :budget_item_id, :amount, :name, :date
end
