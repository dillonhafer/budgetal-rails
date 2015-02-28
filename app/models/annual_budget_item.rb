class AnnualBudgetItem < ActiveRecord::Base
  belongs_to :annual_budget, touch: true

  default_scope { order(:name) }
end
