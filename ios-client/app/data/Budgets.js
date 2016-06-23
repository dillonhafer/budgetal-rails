import {getRequest,putRequest} from './API';

module.exports = {
  find(year, month) {
    return getRequest(`/budgets/${year}/${month}`);
  },
  update(year, month, params) {
    return putRequest(`/budgets/${year}/${month}`, params);
  }
}
