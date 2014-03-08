class AllocationPlan < ActiveRecord::Base
  belongs_to :budget
  has_many :allocation_plan_budget_items
  accepts_nested_attributes_for :allocation_plan_budget_items, allow_destroy: true

  def tab_date
    "#{start_date.strftime("%m/%d")} to #{end_date.strftime("%m/%d")}"
  end

  def amount_allocated
    allocation_plan_budget_items.sum(:amount_budgeted)
  end

  def amount_not_allocated    
    income - amount_allocated
  end  
end
