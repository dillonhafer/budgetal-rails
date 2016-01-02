import {putRequest} from './api';

export default {
  updateBudget(data) {
    return putRequest(`/budgets/${data.id}`, {budget: {monthly_income: data.monthly_income}});
  }
}