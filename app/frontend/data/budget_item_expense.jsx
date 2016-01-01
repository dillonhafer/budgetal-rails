export default {
  createExpense(expense) {
    return $.ajax({
              url: `/budget-item-expenses`,
              dataType: 'json',
              method: 'POST',
              data: {budget_item_expense: expense}
            })
  },
  updateExpense(expense) {
    return $.ajax({
              url: `/budget-item-expenses/${expense.id}`,
              dataType: 'json',
              method: 'PUT',
              data: {budget_item_expense: expense}
            })
  },
  destroyExpense(id) {
    return $.ajax({
              url: `/budget-item-expenses/${id}`,
              dataType: 'json',
              method: 'DELETE'
            })
  },
  predictionsExpense(name) {
    return $.ajax({
              url: `/past-expenses/${name}`,
              dataType: 'json',
              method: 'GET'
            })
  }
}