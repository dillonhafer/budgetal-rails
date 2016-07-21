import {getRequest, postRequest, putRequest, deleteRequest} from './API';

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
  predictExpenses(name) {
    return getRequest(`/past-expenses/${name}`);
  }
}
