import {getRequest} from './api';

export default {
  findStatistic(date) {
    return getRequest(`/monthly-statistics-budget/${date.year}/${date.month}`);
  }
}