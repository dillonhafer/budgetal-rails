class BudgetItem < ActiveRecord::Base
  attr_accessible :budget_category_id, :amount_budgeted, :name
  belongs_to :budget_category
  has_many :budget_item_expenses
  validates_presence_of :budget_category_id, :amount_budgeted, :name
end
