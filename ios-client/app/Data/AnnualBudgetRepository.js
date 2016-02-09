'use strict';

var Api = require('../Utils/ApiUtil');
var AnnualBudgetRepo = {
  all: function(year) {
    var path = `/annual-budgets/${year}`;
    return Api.get(path).then((r) => r.json());
  },
  save: function(budgetItem) {
    var path = `/annual-budget-items/${budgetItem.id}`;
    return Api.put(path, {annual_budget_item: budgetItem})
              .then((r) => r.json());
  },
  delete: function(budgetItem) {
    var path = `/annual-budget-items/${budgetItem.id}`;
    return Api.delete(path, {annual_budget_item: budgetItem})
              .then((r) => r.json());
  },
  create: function(budgetItem) {
    var path = '/annual-budget-items';
    return Api.post(path, {annual_budget_item: budgetItem})
              .then((r) => r.json());
  }
};

module.exports = AnnualBudgetRepo;
