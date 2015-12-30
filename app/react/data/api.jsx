import _ from 'lodash';

export default {
  get(path) {
    return fetch(path, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }});
  },
  post(path, body = {}, params = {}) {
    let csrfToken = document.getElementsByName('csrf-token')[0].content;
    console.log(csrfToken)
    return fetch(path, _.assign({
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(body)
    }, params));
  },
  put(path, body = {}, params = {}) {
    let csrfToken = document.getElementsByName('csrf-token')[0].content;
    console.log(csrfToken)
    return fetch(path, _.assign({
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(body)
    }, params));
  },
  delete(path, body = {}, params = {}) {
    let csrfToken = document.getElementsByName('csrf-token')[0].content;
    console.log(csrfToken)
    return fetch(path, _.assign({
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(body)
    }, params));
  }
}