json.id 		   		  budget_item_expense.id
json.budget_item_id budget_item_expense.budget_item_id
json.name 		   		budget_item_expense.name
json.amount 		   	sprintf('%.2f', budget_item_expense.amount)
json.date 		   		budget_item_expense.date
json.budget do
  json.spent          sprintf('%.2f', budget_item_expense.budget_item.budget_category.budget.total_expenses)
  json.remaining      sprintf('%.2f', budget_item_expense.budget_item.budget_category.budget.budget_remaining)
  json.budgeted       sprintf('%.2f', budget_item_expense.budget_item.budget_category.budget.amount_budgeted)
end