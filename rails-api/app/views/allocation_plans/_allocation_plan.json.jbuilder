json.allocation_plan do
  json.id                   allocation_plan.id
  json.start_date           allocation_plan.start_date
  json.end_date             allocation_plan.end_date
  json.tab_date             allocation_plan.tab_date
  json.income               sprintf('%.2f', allocation_plan.income)
  json.amount_not_allocated sprintf('%.2f', allocation_plan.amount_not_allocated)

  json.item_groups allocation_plan.budget.budget_items.joins(:budget_category)
                                                      .group_by {|i| [i.budget_category.name, i.budget_category_id] }
                                                      .sort {|a,b| a[0][1] <=> b[0][1] } do |category|
    json.name         category[0][0]
    json.category_id  category[0][1]
    json.budget_items category[1] do |item|
      allocation_item = item.allocation_item_from(allocation_plan.allocation_plan_budget_items)
      json.id              allocation_item.id
      json.other_allocated sprintf('%.2f', item.amount_allocated - allocation_item.amount_budgeted)
      json.amount_budgeted sprintf('%.2f', allocation_item.amount_budgeted)
      json.budget_item do
        json.id     item.id
        json.budget_category_id item.budget_category_id
        json.name   item.name
        json.amount sprintf('%.2f', item.amount_budgeted)
      end
    end
  end
end