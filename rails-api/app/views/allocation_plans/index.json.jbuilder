json.budget do
  json.month budget.month
  json.year  budget.year

  json.allocation_plans budget.allocation_plans do |plan|
    json.partial! 'allocation_plan', allocation_plan: plan
  end
end

json.partial! 'allocation_plan', allocation_plan: budget.allocation_plans.first if budget.allocation_plans.any?
