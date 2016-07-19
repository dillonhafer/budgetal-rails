import {getRequest, putRequest, postRequest, deleteRequest, clearSession} from './API';

module.exports = {
  saveUser(params) {
    return postRequest('/update-account-info', params);
  },
  savePhoto(params) {
    return postRequest('/update-avatar', params);
  },
  changePassword(params) {
    return postRequest('/change-password', params);
  },
  accountInfo() {
    return getRequest('/account-info');
  },
  resetPasswordRequest(params) {
    return postRequest('/reset-password', params);
  },
  resetPassword(params) {
    return putRequest('/reset-password', params);
  },
}
