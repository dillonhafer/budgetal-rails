var BudgetCategoryController = {
  find: function(data) {
    var url = '/budget-category/'+data.year+'/'+data.month+'/'+data.id;
    return $.ajax({url: url, dataType: 'json'})
  },
  import: function(id) {
    return $.ajax({
              url: `/budget-category/${id}/copy`,
              dataType: 'json',
              method: 'GET'
            })
  },
}