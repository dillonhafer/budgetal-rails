'use strict';

var Api = require('../Utils/ApiUtil');

var BudgetRepo = {
  find: function(data) {
    var path = `/budget-categories/${data.year}/${data.month}/${data.id}`;
    return Api.get(path).then((r) => r.json());
  }
};

module.exports = BudgetRepo;
