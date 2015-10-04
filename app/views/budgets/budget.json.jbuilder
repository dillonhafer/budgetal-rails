json.budget do
	json.id             updated_budget.id
  json.year           updated_budget.year
  json.month          updated_budget.month
  json.spent          updated_budget.total_expenses
  json.remaining      updated_budget.budget_remaining
  json.budgeted       updated_budget.amount_budgeted
  json.monthly_income updated_budget.monthly_income
  json.not_budgeted   updated_budget.amount_remaining
  json.budget_categories updated_budget.budget_categories do |category|
    json.id   category.id
    json.name category.name
  end
end