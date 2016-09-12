import {getRequest, postRequest, putRequest, deleteRequest} from './api';

module.exports = {
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
  },
  deletePlan(id) {
    return deleteRequest(`/allocation-plans/${id}`);
  }
}