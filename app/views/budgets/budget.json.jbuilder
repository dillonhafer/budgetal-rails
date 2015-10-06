json.budget do
	json.id             updated_budget.id
  json.year           updated_budget.year
  json.month          updated_budget.month
  json.spent          sprintf('%.2f', updated_budget.total_expenses)
  json.remaining      sprintf('%.2f', updated_budget.budget_remaining)
  json.budgeted       sprintf('%.2f', updated_budget.amount_budgeted)
  json.monthly_income sprintf('%.2f', updated_budget.monthly_income)
  json.not_budgeted   sprintf('%.2f', updated_budget.amount_remaining)
  json.budget_categories updated_budget.budget_categories do |category|
    json.id   category.id
    json.name category.name
  end
end