import {getRequest, postRequest, putRequest, deleteRequest} from './api';

export default {
  createExpense(budget_item_expense) {
    return postRequest(`/budget-item-expenses`, {budget_item_expense});
  },
  updateExpense(budget_item_expense) {
    return putRequest(`/budget-item-expenses/${budget_item_expense.id}`, {budget_item_expense});
  },
  destroyExpense(id) {
    return deleteRequest(`/budget-item-expenses/${id}`);
  },
  predictionsExpense(name) {
    return getRequest(`/past-expenses/${name}`);
  }
}