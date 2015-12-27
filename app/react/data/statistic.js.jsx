export default {
  findStatistic: function(data) {
    var url = `/monthly-statistics-budget/${data.year}/${data.month}`;
    return $.ajax({url: url, dataType: 'json'})
  }
}