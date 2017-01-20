import {getRequest, postRequest, putRequest, deleteRequest} from './api';

module.exports = {
  allItems(year) {
    return getRequest(`/annual-budgets/${year}`);
  },
  createItem(annual_budget_item) {
    return postRequest('/annual-budget-items', {annual_budget_item});
  },
  updateItem(annual_budget_item) {
    return putRequest(`/annual-budget-items/${annual_budget_item.id}`, {annual_budget_item});
  },
  destroyItem(id) {
    return deleteRequest(`/annual-budget-items/${id}`);
  }
}
