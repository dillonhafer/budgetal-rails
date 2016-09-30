json.id             budget.id
json.year           budget.year
json.month          budget.month
json.spent          sprintf('%.2f', budget.total_expenses)
json.remaining      sprintf('%.2f', budget.budget_remaining)
json.budgeted       sprintf('%.2f', budget.amount_budgeted)
json.monthly_income sprintf('%.2f', budget.monthly_income)
json.not_budgeted   sprintf('%.2f', budget.amount_remaining)
json.budget_categories budget.budget_categories do |category|
  json.id         category.id
  json.name       category.name
  json.percentage category.percentage
  json.amount_spent     sprintf('%.2f', category.total_spent)
  json.amount_remaining sprintf('%.2f', category.budget_remaining)
end
