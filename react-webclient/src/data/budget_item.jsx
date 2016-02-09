import {postRequest, putRequest, deleteRequest, patchRequest} from './api';

export default {
  createItem(data) {
    return postRequest('/budget-items', data);
  },
  updateItem(budget_item) {
    return putRequest(`/budget-items/${budget_item.id}`, {budget_item});
  },
  destroyItem(id) {
    return deleteRequest(`/budget-items/${id}`);
  },
  moveItem(budget_category_id, id) {
    return patchRequest('/move-budget-item', {budget_category_id, id});
  }
}