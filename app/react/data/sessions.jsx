export default {
  signIn(data) {
    return $.ajax({
              url: '/api/sessions/sign-in',
              dataType: 'json',
              method: 'POST',
              data: data
            })
  },
  signUp(data) {
    return $.ajax({
              url: '/api/sessions/sign-up',
              dataType: 'json',
              method: 'POST',
              data: data
            })
  }
}