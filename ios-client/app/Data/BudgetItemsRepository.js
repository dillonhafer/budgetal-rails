'use strict';

var Api = require('../Utils/ApiUtil');

var BudgetItemsRepo = {
  find: function(data) {
    var path = `/budget-items/${data.id}`;
    return Api.get(path).then((r) => r.json());
  }
};

module.exports = BudgetItemsRepo;
