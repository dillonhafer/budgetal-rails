json.budget do
	json.id             budget_category.budget.id
  json.year           budget_category.budget.year
  json.month          budget_category.budget.month
  json.spent          budget_category.budget.total_expenses
  json.remaining      budget_category.budget.budget_remaining
  json.budgeted       budget_category.budget.amount_budgeted
  json.monthly_income budget_category.budget.monthly_income
  json.not_budgeted   budget_category.budget.amount_remaining
  json.budget_categories budget_category.budget.budget_categories do |category|
    json.id   category.id
    json.name category.name
  end
end

json.budget_category do
	json.id               budget_category.id
	json.name             budget_category.name
	json.percentage       budget_category.percentage
	json.amount_budgeted  budget_category.total_budgeted
	json.amount_spent     budget_category.total_spent
	json.amount_remaining budget_category.budget_remaining

	json.budget_items budget_category.budget_items do |item|
		json.id								item.id
		json.name             item.name
		json.amount_budgeted  item.amount_budgeted
		json.amount_remaining item.amount_remaining
		json.amount_spent     item.amount_spent

		json.budget_item_expenses item.budget_item_expenses do |expense|
			json.id							expense.id
			json.budget_item_id expense.budget_item_id
			json.date   				expense.date
			json.name	  				expense.name
			json.amount 				expense.amount
		end
	end
end