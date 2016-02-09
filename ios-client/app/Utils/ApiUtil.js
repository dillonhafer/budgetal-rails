'use strict';

var SIGN_IN_PATH = '/sessions/sign-in';
var SIGN_OUT_PATH = '/sessions/sign-out';
var React = require('react-native');
var window = require('./window');
var {
  AsyncStorage
} = React;
var STORAGE_KEY = '@BudgetalCSRFToken:key';

var ApiUtil = {
  fullPath: function(path) {
    if (baseApi !== null) {
      return `${baseApi}${path}`;
    } else {
      window.alert("API Path could not be found.")
    }
  },
  get: function(path, params = {}) {
    var fullPath = this.fullPath(path);
    return fetch(fullPath, Object.assign({
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, params));
  },
  post: function(path, body = {}, params = {}) {
    var self = this;
    var fullPath = this.fullPath(path);
    return self.retrieveCsrf()
      .then(function() {
        var xhrObj = Object.assign({
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': self.csrf()
          },
          body: JSON.stringify(body)
        }, params);
        return fetch(fullPath, xhrObj);
      });
  },
  put: function(path, body = {}, params = {}) {
    var self = this;
    var fullPath = this.fullPath(path);
    return self.retrieveCsrf()
      .then(function() {
        var xhrObj = Object.assign({
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': self.csrf()
          },
          body: JSON.stringify(body)
        }, params);
        return fetch(fullPath, xhrObj);
      });
  },
  delete: function(path, body = {}, params = {}) {
    var self = this;
    var fullPath = this.fullPath(path);
    return self.retrieveCsrf()
      .then(function() {
        var xhrObj = Object.assign({
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': self.csrf()
          },
          body: JSON.stringify(body)
        }, params);
        return fetch(fullPath, xhrObj);
      });
  },
  signIn: function(email, password) {
    var self = this;
    return self.getCsrf().then(function() {
      return self.createSignIn(email, password);
    }).then(function(res) {
      self._csrf = res.headers.get('X-CSRF-Token');
      AsyncStorage.setItem(STORAGE_KEY, self._csrf).done();
      return res.json();
    });
  },
  retrieveCsrf: function() {
    var self = this;
    return AsyncStorage.getItem(STORAGE_KEY)
             .then((value) => {
               self._csrf = value;
             });
  },
  csrf: function() { return this._csrf; },
  getCsrf: function() {
    var self = this;
    return this.get(SIGN_IN_PATH)
      .then(function(res) {
        self._csrf = res.headers.get('X-CSRF-Token');
      })
  },
  createSignIn: function(email, password) {
    var fullPath = this.fullPath(SIGN_IN_PATH);
    var xhrObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrf()
      },
      body: JSON.stringify({user: {email: email, password: password}})
    };
    return fetch(fullPath, xhrObj);
  },
  signOut: function() {
    return this.delete(SIGN_OUT_PATH)
  }
};

module.exports = ApiUtil;
