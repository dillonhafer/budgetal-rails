export default {
  allItems(year) {
    return $.ajax({
              url: `/annual-budgets/${year}`,
              dataType: 'json'
            })
  },
  createItem(budget_item) {
    return $.ajax({
              url: '/annual-budget-items',
              dataType: 'json',
              method: 'POST',
              data: budget_item
            })
  },
  updateItem(data) {
    return $.ajax({
              url: '/annual-budget-items/' + data.annual_budget_item.id,
              dataType: 'json',
              method: 'PUT',
              data: data
            })
  },
  destroyItem(id) {
    return $.ajax({
              url: '/annual-budget-items/'+id,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}