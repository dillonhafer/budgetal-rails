import {postRequest} from './api';

export default {
  changePassword(data) {
    return postRequest('/change-password', data);
  },
  updateAccountInfo(data) {
    return postRequest('/update-account-info', data);
  }
}