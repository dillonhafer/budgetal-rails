import {getRequest} from '../Utils/api';

module.exports = {
  findCategory(data) {
    return getRequest(`/budget-categories/${data.year}/${data.month}/${data.id}`);
  },
  importCategory(id) {
    return getRequest(`/budget-categories/${id}/import`);
  }
}