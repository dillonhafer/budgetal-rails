export default {
  createItem(data) {
    return $.ajax({
              url: '/budget-items',
              dataType: 'json',
              method: 'POST',
              data: data
            })
  },
  updateItem(item) {
    return $.ajax({
              url: `/budget-items/${item.id}`,
              dataType: 'json',
              method: 'PUT',
              data: {budget_item: item}
            })
  },
  destroyItem(id) {
    return $.ajax({
              url: `/budget-items/${id}`,
              dataType: 'json',
              method: 'DELETE'
            })
  },
  moveItem(category_id, item_id) {
    return $.ajax({
              url: '/move-budget-item',
              dataType: 'json',
              method: 'PATCH',
              data: {budget_category_id: category_id, id: item_id}
            })
  }
}