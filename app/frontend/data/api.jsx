export default {
  getRequest(path) {
    var path = `/api${path}`;
    return fetch(path, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then((r) => r.json());
  },
  postRequest(path, body={}) {
    return nonGetRequest('POST', path, body);
  },
  putRequest(path, body={}) {
    return nonGetRequest('PUT', path, body);
  },
  deleteRequest(path) {
    return nonGetRequest('DELETE', path);
  },
  patchRequest(path, body) {
    return nonGetRequest('PATCH', path, body);
  }
}

function nonGetRequest(method, path, body) {
  var path = `/api${path}`;
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
}