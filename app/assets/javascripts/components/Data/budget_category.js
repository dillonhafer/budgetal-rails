var BudgetCategoryController = {
  find: function(data) {
    var url = '/budget-category/'+data.year+'/'+data.month+'/'+data.id;
    return $.ajax({url: url, dataType: 'json'})
  }
}