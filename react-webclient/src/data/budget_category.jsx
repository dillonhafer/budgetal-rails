import {getRequest} from './api';

export default {
  findCategory(data) {
    return getRequest(`/budget-categories/${data.year}/${data.month}/${data.id}`);
  },
  importCategory(id) {
    return getRequest(`/budget-categories/${id}/import`);
  }
}