import {putRequest} from './api';

module.exports = {
  updateBudget(data) {
    return putRequest(`/budgets/${data.id}`, {budget: {monthly_income: data.monthly_income}});
  }
}