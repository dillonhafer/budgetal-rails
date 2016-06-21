import {getRequest, postRequest, deleteRequest, clearSession} from './API';

module.exports = {
  save(params) {
    return postRequest('/update-account-info', params);
  },
  savePhoto(params) {
    return postRequest('/update-avatar', params);
  },
  accountInfo() {
    return getRequest('/account-info')
  },
}
