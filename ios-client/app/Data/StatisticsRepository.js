'use strict';

var Api = require('../Utils/ApiUtil');

var StatisticsRepo = {
  find: function(data) {
    var path = `/monthly-statistics-budget/${data.year}/${data.month}`;
    return Api.get(path).then((r) => r.json());
  }
};

module.exports = StatisticsRepo;
