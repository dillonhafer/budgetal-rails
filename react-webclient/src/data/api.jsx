import _ from 'lodash';

module.exports = {
  getRequest(path) {
    return request('GET', path, {})
  },
  postRequest(path, body={}) {
    return request('POST', path, body);
  },
  putRequest(path, body={}) {
    return request('PUT', path, body);
  },
  deleteRequest(path) {
    return request('DELETE', path);
  },
  patchRequest(path, body) {
    return request('PATCH', path, body);
  }
}

function requestOk(r) {
  return r.ok || r.status === 422;
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

function request(method, path, body) {
  var path = API_URL + path;
  var headers = requestHeaders();
  var req = {method, headers};
  if (method !== 'GET')
    req.body = JSON.stringify(body);

  return fetch(path, req).then((r) => {
    if (r.status === 401) {
      localStorage.clear();
      let json = r.json();
      return json.then(Promise.reject.bind(Promise));
    } else if (requestOk(r)) {
      return r.json();
    } else {
      return {success: false, message: r.statusText};
    }
  })
  .catch((r) => {
    if (r.message === "You must sign in or up before continuing") {
      throw({message: r.message})
    } else {
      window.location = '/503';
    }
  })
}
