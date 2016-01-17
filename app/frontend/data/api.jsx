export default {
  getRequest(path) {
    var path = `/api${path}`;
    var headers = requestHeaders();
    return fetch(path, {method: 'GET', headers}).then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        return {success: false, message: r.statusText};
      }
    });
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

function getSession() {
  var defaultSession = '{"authentication_token":"","authentication_key":""}';
  return JSON.parse(localStorage['session'] || defaultSession);
}

function requestHeaders() {
  var session = getSession();
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-AUTHENTICATION-TOKEN': session.authentication_token,
    'X-AUTHENTICATION-KEY': session.authentication_key
  }
}

function nonGetRequest(method, path, body) {
  var path = `/api${path}`;
  var headers = requestHeaders();
  var body = JSON.stringify(body);
  return fetch(path, {method, headers, body}).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      return {success: false, message: r.statusText};
    }
  });
}
