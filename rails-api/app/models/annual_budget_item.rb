class AnnualBudgetItem < ApplicationRecord
  belongs_to :annual_budget
  validates_presence_of :name, :amount, :due_date
  default_scope -> { order(:name) }
end
