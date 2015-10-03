var BudgetItemController = {
  create: function(data) {
    return $.ajax({
              url: '/budget-items',
              dataType: 'json',
              method: 'POST',
              data: data
            })
  },
  update: function(item) {
    return $.ajax({
              url: `/budget-items/${item.id}`,
              dataType: 'json',
              method: 'PUT',
              data: {budget_item: item}
            })
  },
  destroy: function(id) {
    return $.ajax({
              url: `/budget-items/${id}`,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}