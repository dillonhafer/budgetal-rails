json.budget do
  json.month budget.month
  json.year  budget.year

  json.allocation_plans budget.allocation_plans do |plan|
    json.id         plan.id
    json.tab_date   plan.tab_date
    json.start_date plan.start_date
    json.end_date   plan.end_date
    json.income     sprintf('%.2f', plan.income)
    json.amount_not_allocated sprintf('%.2f', plan.amount_not_allocated)
  end
end

json.partial! 'allocation_plan', allocation_plan: budget.allocation_plans.first if budget.allocation_plans.any?
