import {getRequest, postRequest, deleteRequest} from './api';

export default {
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
  endSession(session) {
    return deleteRequest(`/sessions/sign-out?authentication_key=${session.authentication_key}`);
  }
}