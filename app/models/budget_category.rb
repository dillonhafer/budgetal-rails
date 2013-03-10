class BudgetCategory < ActiveRecord::Base
  attr_accessible :budget_id, :name, :percentage
  belongs_to :budget
  has_many :budget_items
  validates_presence_of :budget_id, :name, :percentage
end
