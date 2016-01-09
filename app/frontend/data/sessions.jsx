import {postRequest, deleteRequest} from './api';

export default {
  signIn(data) {
    return postRequest('/sessions/sign-in', data);
  },
  signUp(data) {
    return postRequest('/sessions/sign-up', data);
  },
  signOut() {
    return deleteRequest('/sessions/sign-out');
  }
}