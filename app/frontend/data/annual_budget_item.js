import {getRequest, postRequest, putRequest, deleteRequest} from './api';

export default {
  allItems(year) {
    return getRequest(`/annual-budgets/${year}`);
  },
  createItem(budget_item) {
    return postRequest('/annual-budget-items', budget_item);
  },
  updateItem(data) {
    return putRequest(`/annual-budget-items/${data.annual_budget_item.id}`, data);
  },
  destroyItem(id) {
    return deleteRequest(`/annual-budget-items/${id}`);
  }
}