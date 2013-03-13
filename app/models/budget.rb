class Budget < ActiveRecord::Base
  attr_accessible :month, :monthly_income
  
  belongs_to :user
  has_many :budget_categories
  has_many :budget_items, through: :budget_categories
  validates_presence_of :month, :monthly_income
end
