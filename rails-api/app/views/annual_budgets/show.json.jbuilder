json.id             annual_budget.id
json.year           annual_budget.year
json.annual_budget_items annual_budget.annual_budget_items do |budget_item|
  json.id                 budget_item.id
  json.annual_budget_id   budget_item.annual_budget_id
  json.name               budget_item.name
  json.amount             sprintf('%.2f', budget_item.amount)
  json.due_date           budget_item.due_date
  json.paid               budget_item.paid
end
