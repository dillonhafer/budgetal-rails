import {getRequest, putRequest, postRequest, deleteRequest} from '../Utils/api';
module.exports = {
  all(year) {
    return getRequest(`/annual-budgets/${year}`);
  },
  save(annual_budget_item) {
    return putRequest(`/annual-budget-items/${annual_budget_item.id}`, {annual_budget_item});
  },
  delete(annual_budget_item) {
    return deleteRequest(`/annual-budget-items/${annual_budget_item.id}`, {annual_budget_item});
  },
  create(annual_budget_item) {
    return postRequest(`/annual-budget-items/${annual_budget_item.id}`, {annual_budget_item});
  }
};
