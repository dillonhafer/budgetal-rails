import {getRequest, putRequest, postRequest, deleteRequest} from './API';
module.exports = {
  all(year) {
    return getRequest(`/annual-budgets/${year}`);
  },
  update(params) {
    return putRequest(`/annual-budget-items/${params.annual_budget_item.id}`, params.annual_budget_item);
  },
  deleteItem(id) {
    return deleteRequest(`/annual-budget-items/${id}`);
  },
  create(annual_budget_item) {
    return postRequest(`/annual-budget-items`, annual_budget_item);
  }
};
