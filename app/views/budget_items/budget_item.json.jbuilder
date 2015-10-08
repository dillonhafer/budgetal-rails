json.id                 budget_item.id
json.budget_category_id budget_item.budget_category_id
json.name               budget_item.name
json.amount_budgeted    sprintf('%.2f', budget_item.amount_budgeted)
json.amount_remaining   sprintf('%.2f', budget_item.amount_remaining)
json.amount_spent       sprintf('%.2f', budget_item.amount_spent)