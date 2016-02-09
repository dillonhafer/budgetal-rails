var React = require('react-native');
var window = require('./window');

var {
  AsyncStorage
} = React;

const AUTH_KEY   = '@BudgetalAuthKey:key';
const AUTH_TOKEN = '@BudgetalAuthToken:key';

export default {
  getRequest(path) {
    return request('GET', path)
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

async function request(method, path, body) {
  const API_URL = 'http://localhost:3000';
  var path = API_URL + path;
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-AUTHENTICATION-KEY': '',
    'X-AUTHENTICATION-TOKEN': ''
  };

  try {
    var auth_tokens = await AsyncStorage.multiGet([AUTH_KEY, AUTH_TOKEN]);
    if (auth_tokens !== null) {
      debugger
      headers['X-AUTHENTICATION-KEY']   = auth_tokens['key'];
      headers['X-AUTHENTICATION-TOKEN'] = auth_tokens['token'];
    } else {
      window.alert({title: 'nnoo', message: "You must sign in 9"})
    }
  } catch (error) {
    window.alert({title: 'no', message: "somthing went very wrong 9"})
  }

  var req = {method, headers};
  if (method !== 'GET')
    req.body = JSON.stringify(body);

  return fetch(path, req).then((r) => {
    if (r.status === 401) {
      AsyncStorage.multiRemove([AUTH_KEY, AUTH_TOKEN]);
      let json = r.json();
      return json.then(Promise.reject.bind(Promise));
    } else if (requestOk(r)) {
      return r.json();
    } else {
      return {success: false, message: r.statusText};
    }
  })
  .catch((r) => {
    window.alert({title: 'maint', message: "We are performing maintenance right now. We will be done shortly."})
  })
}