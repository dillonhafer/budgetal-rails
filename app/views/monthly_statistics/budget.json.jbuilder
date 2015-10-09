json.budget do
  json.id             budget.id
  json.year           budget.year
  json.month          budget.month
  json.budget_categories budget.budget_categories do |budget_category|
    json.name           budget_category.name
    json.percent_spent  sprintf('%.2f', budget_category.percent_of_budget_spent)
  end
end