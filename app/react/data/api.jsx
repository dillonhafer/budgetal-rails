export default {
  nonGetRequest(method, path, body) {
    let meta = document.querySelector('meta[name="csrf-token"]')
    let csrfToken = meta ? meta.content : '';
    return fetch(path, {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(body)
    }).then((r) => r.json());
  },
  getRequest(path) {
    return fetch(path, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then((r) => r.json());
  },
  postRequest(path, body={}) {
    return module.exports.nonGetRequest('POST', path, body);
  },
  putRequest(path, body={}) {
    return module.exports.nonGetRequest('PUT', path, body);
  },
  deleteRequest(path) {
    return module.exports.nonGetRequest('DELETE', path);
  }
}