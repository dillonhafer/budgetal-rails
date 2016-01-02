import {postRequest} from './api';

export default {
  signIn(data) {
    return postRequest('/api/sessions/sign-in', data);
  },
  signUp(data) {
    return postRequest('/api/sessions/sign-up', data);
  }
}