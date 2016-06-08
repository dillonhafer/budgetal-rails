import {postRequest, putRequest, deleteRequest, patchRequest} from '../Utils/api';

module.exports = {
  createItemExpense(budget_item_expense) {
    return postRequest('/budget-item-expenses', budget_item_expense);
  },
  updateItemExpense(data) {
    return putRequest(`/budget-item-expenses/${data.budget_item_expense.id}`, data);
  },
  deleteItemExpense(id) {
    return deleteRequest(`/budget-item-expenses/${id}`);
  },
}
