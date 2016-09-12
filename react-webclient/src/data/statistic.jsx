import {getRequest} from './api';

module.exports = {
  findStatistic(date) {
    return getRequest(`/monthly-statistics-budget/${date.year}/${date.month}`);
  }
}