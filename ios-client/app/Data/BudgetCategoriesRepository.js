'use strict';

var Api = require('../Utils/ApiUtil');

var BudgetCategoriesRepo = {
  find: function(data) {
    var path = `/budget-categories/${data.id}`;
    return Api.get(path).then((r) => r.json());
  },
  import: function(id) {
    var path = `/budget-categories/${id}/import`;
    return Api.get(path).then((r) => r.json());
  }
};

module.exports = BudgetCategoriesRepo;
