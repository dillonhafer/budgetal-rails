class AllocationPlan < ActiveRecord::Base
  belongs_to :budget
  belongs_to :user
  has_many :allocation_plan_budget_items, dependent: :destroy
  validates_presence_of :income

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
