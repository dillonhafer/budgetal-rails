import {getRequest, postRequest, deleteRequest, clearSession} from '../Utils/api';

module.exports = {
  signIn(data) {
    return postRequest('/sessions/sign-in', data);
  },
  signUp(data) {
    return postRequest('/sessions/sign-up', data);
  },
  signOut() {
    return deleteRequest('/sessions/sign-out');
  },
  allSessions() {
    return getRequest('/sessions');
  },
  endSession() {
    return clearSession();
  }
}