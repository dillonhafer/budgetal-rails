json.budget do
  json.id             budget_category.budget.id
  json.year           budget_category.budget.year
  json.month          budget_category.budget.month
  json.monthly_income sprintf('%.2f', budget_category.budget.monthly_income)
  json.budget_categories budget_category.budget.budget_categories do |category|
    json.id         category.id
    json.name       category.name
    json.percentage category.percentage
  end
end

json.budget_category do
  json.id               budget_category.id
  json.name             budget_category.name
  json.percentage       budget_category.percentage
end

# NEW API. ABOVE IS DEPRECATED
json.budgetCategories budget.budget_categories do |budget_category|
  json.id         budget_category.id
  json.name       budget_category.name
  json.percentage budget_category.percentage
end

json.budgetItems budget.budget_categories.map(&:budget_items).flatten do |budget_item|
  json.id                 budget_item.id
  json.budget_category_id budget_item.budget_category_id
  json.name               budget_item.name
  json.amount_budgeted    sprintf('%.2f', budget_item.amount_budgeted)
end

json.budgetItemExpenses budget.budget_categories.map(&:budget_items).flatten.map(&:budget_item_expenses).flatten do |budget_item_expense|
  json.id             budget_item_expense.id
  json.budget_item_id budget_item_expense.budget_item_id
  json.name           budget_item_expense.name
  json.amount         sprintf('%.2f', budget_item_expense.amount)
  json.date           budget_item_expense.date
end
