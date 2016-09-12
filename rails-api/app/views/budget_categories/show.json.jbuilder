json.budget do
  json.id             budget_category.budget.id
  json.year           budget_category.budget.year
  json.month          budget_category.budget.month
  json.spent          sprintf('%.2f', budget_category.budget.total_expenses)
  json.remaining      sprintf('%.2f', budget_category.budget.budget_remaining)
  json.budgeted       sprintf('%.2f', budget_category.budget.amount_budgeted)
  json.monthly_income sprintf('%.2f', budget_category.budget.monthly_income)
  json.not_budgeted   sprintf('%.2f', budget_category.budget.amount_remaining)
  json.budget_categories budget_category.budget.budget_categories do |category|
    json.id   category.id
    json.name category.name
    json.amount_spent     sprintf('%.2f', category.total_spent)
    json.amount_remaining sprintf('%.2f', category.budget_remaining)
  end
end

json.budget_category do
  json.id               budget_category.id
  json.name             budget_category.name
  json.percentage       budget_category.percentage
  json.amount_budgeted  sprintf('%.2f', budget_category.total_budgeted)
  json.amount_spent     sprintf('%.2f', budget_category.total_spent)
  json.amount_remaining sprintf('%.2f', budget_category.budget_remaining)

  json.budget_items budget_category.budget_items do |item|
    json.id                 item.id
    json.budget_category_id item.budget_category_id
    json.name               item.name
    json.amount_budgeted    sprintf('%.2f', item.amount_budgeted)
    json.amount_remaining   sprintf('%.2f', item.amount_remaining)
    json.amount_spent       sprintf('%.2f', item.amount_spent)

    json.budget_item_expenses item.budget_item_expenses do |expense|
      json.id             expense.id
      json.budget_item_id expense.budget_item_id
      json.date           expense.date
      json.name           expense.name
      json.amount         sprintf('%.2f', expense.amount)
    end
  end
end

# NEW API. ABOVE IS DEPRECATED
json.budgetCategories budget.budget_categories do |budget_category|
  json.id   budget_category.id
  json.name budget_category.name
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