import {getRequest} from './API';

module.exports = {
  find(data) {
    return getRequest(`/monthly-statistics-budget/${data.year}/${data.month}`);
  }
}
