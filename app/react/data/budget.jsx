export default {
  updateBudget(data) {
    return $.ajax({
      url: `/budgets/${data.id}`,
      dataType: 'json',
      method: 'PUT',
      data: {budget: {id: data.id, monthly_income: data.monthly_income}}
    })
  }
}