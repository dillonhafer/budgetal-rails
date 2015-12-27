export default {
  findCategory(data) {
    var url = '/budget-categories/'+data.year+'/'+data.month+'/'+data.id;
    return $.ajax({url: url, dataType: 'json'})
  },
  importCategory(id) {
    return $.ajax({
              url: `/budget-categories/${id}/import`,
              dataType: 'json',
              method: 'GET'
            })
  }
}