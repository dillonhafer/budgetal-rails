import {getRequest, postRequest, deleteRequest, clearSession} from './API';

module.exports = {
  signIn(data) {
    return postRequest('/sessions/sign-in', data);
  },
  signUp(data) {
    return postRequest('/sessions/sign-up', data);
  },
  signOut(session) {
    return deleteRequest(`/sessions/sign-out?authentication_key=${session.authentication_key}`);
  },
  allSessions() {
    return getRequest('/sessions');
  },
  endSession() {
    return clearSession();
  }
}
