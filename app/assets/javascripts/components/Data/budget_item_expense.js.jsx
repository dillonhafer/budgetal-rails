var ExpenseController = {
  create: function(expense) {
    return $.ajax({
              url: `/budget-item-expenses`,
              dataType: 'json',
              method: 'POST',
              data: {budget_item_expense: expense}
            })
  },
  update: function(expense) {
    return $.ajax({
              url: `/budget-item-expenses/${expense.id}`,
              dataType: 'json',
              method: 'PUT',
              data: {budget_item_expense: expense}
            })
  },
  destroy: function(id) {
    return $.ajax({
              url: `/budget-item-expenses/${id}`,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}