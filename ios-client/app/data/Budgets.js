import {getRequest} from './API';

module.exports = {
  find(year, month) {
    return getRequest(`/budgets/${year}/${month}`);
  },
}
