class AnnualBudgetItem < ApplicationRecord
  belongs_to :annual_budget
  validates_presence_of :name, :amount, :due_date
  default_scope -> { order(:name) }

  def self.due_in_6_months
    where(due_date: 6.months.from_now)
  end
end
