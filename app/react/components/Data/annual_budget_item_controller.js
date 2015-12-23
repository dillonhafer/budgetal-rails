var AnnualBudgetItemController = {
  all: function(data) {
    return $.ajax({
              url: '/annual-budgets',
              dataType: 'json',
              data: data
            })
  },
  create: function(budget_item) {
    return $.ajax({
              url: '/annual-budget-items',
              dataType: 'json',
              method: 'POST',
              data: budget_item
            })
  },
  update: function(data) {
    return $.ajax({
              url: '/annual-budget-items/' + data.annual_budget_item.id,
              dataType: 'json',
              method: 'PUT',
              data: data
            })
  },
  destroy: function(id) {
    return $.ajax({
              url: '/annual-budget-items/'+id,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}

export { AnnualBudgetItemController }
