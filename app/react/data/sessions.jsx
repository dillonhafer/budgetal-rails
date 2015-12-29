export default {
  login(data) {
    return $.ajax({
              url: '/api/sessions/sign-in',
              dataType: 'json',
              method: 'POST',
              data: data
            })
  },
  logout(id) {
    return $.ajax({
              url: `/budget-items/${id}`,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}