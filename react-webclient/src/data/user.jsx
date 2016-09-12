import {postRequest, putRequest} from './api';

module.exports = {
  changePassword(data) {
    return postRequest('/change-password', data);
  },
  updateAccountInfo(data) {
    return postRequest('/update-account-info', data);
  },
  resetPasswordRequest(params) {
    return postRequest('/reset-password', params);
  },
  resetPassword(params) {
    return putRequest('/reset-password', params);
  },
}
