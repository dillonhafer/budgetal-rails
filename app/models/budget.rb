class Budget < ActiveRecord::Base
  attr_accessible :month, :monthly_income
  has_many :budget_categories
  validates_presence_of :month, :monthly_income
end
