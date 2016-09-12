import {postRequest, putRequest} from './api';

module.exports = {
  createItem(data) {
    return postRequest('/allocation-plan-budget-items', data);
  },
  updateItem(data) {
    return putRequest(`/allocation-plan-budget-items/${data.id}`, data);
  }
}