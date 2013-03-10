class BudgetItemExpense < ActiveRecord::Base
  attr_accessible :budget_item_id, :amount, :name, :date
  belongs_to :budget_item
end
