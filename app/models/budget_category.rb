class BudgetCategory < ActiveRecord::Base
  attr_accessible :budget_id, :name, :percentage
  belongs_to :budget
  has_many :budget_items
end
