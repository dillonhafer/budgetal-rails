export default {
  getRequest(path) {
    var session = findSession();
    var path = `/api${path}`;
    return fetch(path, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-AUTHENTICATION-TOKEN': session.authentication_token,
        'X-AUTHENTICATION-KEY': session.authentication_key
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

function findSession() {
  var defaultSession = JSON.stringify({
    authentication_token: '',
    authentication_key: ''
  });
  return JSON.parse(localStorage['session'] || defaultSession);
}

function nonGetRequest(method, path, body) {
  var path = `/api${path}`;
  var session = findSession();
  return fetch(path, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-AUTHENTICATION-TOKEN': session.authentication_token,
      'X-AUTHENTICATION-KEY': session.authentication_key
    },
    body: JSON.stringify(body)
  }).then((r) => r.json());
}
