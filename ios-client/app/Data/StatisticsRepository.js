import {getRequest} from '../Utils/api';

module.exports = {
  find(data) {
    return getRequest(`/monthly-statistics-budget/${data.year}/${data.month}`);
  }
}
