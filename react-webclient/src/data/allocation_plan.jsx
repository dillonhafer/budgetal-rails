import {getRequest, postRequest, putRequest, deleteRequest} from './api';

export default {
  allPlans(date) {
    return getRequest(`/allocation-plans/${date.year}/${date.month}`);
  },
  find(id) {
    return getRequest(`/allocation-plans/${id}`);
  },
  createPlan(date, data) {
    return postRequest(`/allocation-plans/${date.year}/${date.month}`, data);
  },
  updatePlan(date, data) {
    return putRequest(`/allocation-plans/${date.year}/${date.month}/${data.id}`, data);
  }
}