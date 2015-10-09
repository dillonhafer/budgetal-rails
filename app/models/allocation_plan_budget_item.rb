class AllocationPlanBudgetItem < ActiveRecord::Base
  belongs_to :allocation_plan
  belongs_to :budget_item
  validates_presence_of :amount_budgeted
end
