import {postRequest, putRequest} from './api';

export default {
  createItem(data) {
    return postRequest('/allocation-plan-budget-items', data);
  },
  updateItem(data) {
    return putRequest(`/allocation-plan-budget-items/${data.id}`, data);
  }
}