json.id                 budget_item.id
json.budget_category_id budget_item.budget_category_id
json.name               budget_item.name
json.amount_budgeted    sprintf('%.2f', budget_item.amount_budgeted)
json.amount_remaining   sprintf('%.2f', budget_item.amount_remaining)
json.amount_spent       sprintf('%.2f', budget_item.amount_spent)
json.budget do
  json.spent          sprintf('%.2f', budget_item.budget_category.budget.total_expenses)
  json.remaining      sprintf('%.2f', budget_item.budget_category.budget.budget_remaining)
  json.budgeted       sprintf('%.2f', budget_item.budget_category.budget.amount_budgeted)
end