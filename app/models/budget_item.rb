class BudgetItem < ActiveRecord::Base
  attr_accessible :budget_category_id, :amount_budgeted
  belongs_to :budget_category
  has_many :budget_item_expenses
end
