class Budget < ActiveRecord::Base
  attr_accessible :month, :monthly_income
  has_many :budget_categories
end
