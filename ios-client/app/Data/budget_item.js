import {postRequest, putRequest, deleteRequest, patchRequest} from '../Utils/api';

module.exports = {
  createItem(budget_item) {
    return postRequest('/budget-items', budget_item);
  },
  updateItem(data) {
    return putRequest(`/budget-items/${data.budget_item.id}`, data);
  },
  destroyItem(id) {
    return deleteRequest(`/budget-items/${id}`);
  },
  moveItem(budget_category_id, id) {
    return patchRequest('/move-budget-item', {budget_category_id, id});
  }
}