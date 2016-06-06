var React = require('react-native');
var window = require('./window');

var {
  AsyncStorage,
  StatusBar,
} = React;

const AUTH_KEY    = '@BudgetalAuthKey:key';
const AUTH_TOKEN  = '@BudgetalAuthToken:key';
const USER_KEY    = '@BudgetalUserKey:user';
const API_URL_KEY = '@BudgetalAPIURL:url';

let Api = {
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
  },
  saveTokens(key,token,user) {
    return _saveTokens(key,token,user);
  },
  signedIn() {
    return _signedIn();
  },
  clearSession() {
    return _clearSession();
  },
  setApiUrl(url) {
    return _setApiUrl(url);
  }
};

function requestOk(r) {
  return r.ok || r.status === 422;
}

async function _signedIn() {
    try {
      let resp = await AsyncStorage.getItem(AUTH_KEY);
      return resp !== null;
    } catch(e) {
      console.log(e);
    }
}

async function _setApiUrl(url) {
  return AsyncStorage.setItem(API_URL_KEY, url);
}

async function _clearSession() {
  let authenticationKey = await AsyncStorage.getItem(AUTH_KEY);
  return request('DELETE', `/sessions/sign-out?authentication_key=${authenticationKey}`)
    .then(() => {
      return clearAsyncStorage();
    });
}

async function clearAsyncStorage() {
  return AsyncStorage.multiRemove([AUTH_KEY, AUTH_TOKEN, USER_KEY]);
}

async function _saveTokens(auth_key, auth_token, user) {
  return AsyncStorage.multiSet([[AUTH_KEY, auth_key], [AUTH_TOKEN, auth_token], [USER_KEY, user]]);
}

async function request(method, path, body) {
  let fullPath = '';
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-AUTHENTICATION-KEY': '',
    'X-AUTHENTICATION-TOKEN': ''
  };

  try {
    var auth_tokens = await AsyncStorage.multiGet([AUTH_KEY, AUTH_TOKEN, API_URL_KEY]);
    if (auth_tokens !== null) {
      headers['X-AUTHENTICATION-KEY']   = auth_tokens[0][1];
      headers['X-AUTHENTICATION-TOKEN'] = auth_tokens[1][1];
      fullPath = auth_tokens[2][1] + path;
    } else {
      window.alert({title: 'nnoo', message: "You must sign in 9"})
    }
  } catch (error) {
    window.alert({title: 'no', message: "somthing went very wrong 9"})
  }

  var req = {method, headers};
  if (method !== 'GET')
    req.body = JSON.stringify(body);

  StatusBar.setNetworkActivityIndicatorVisible(true);
  return fetch(fullPath, req).then((r) => {
    StatusBar.setNetworkActivityIndicatorVisible(false);
    if (r.status === 401) {
      clearAsyncStorage()
      let json = r.json();
      return json.then(Promise.reject.bind(Promise));
    } else if (requestOk(r)) {
      return r.json();
    } else {
      return {success: false, message: r.statusText};
    }
  })
  .catch((r) => {
    StatusBar.setNetworkActivityIndicatorVisible(false);
    if (r.message === "You must sign in or up before continuing") {
      window.alert({title: 'Sign In', message: r.message});
      throw('unauthorized')
    } else {
      window.alert({title: 'maint', message: "We are performing maintenance right now. We will be done shortly."})
      throw('maintenance')
    }
  })
}

module.exports = Api;
