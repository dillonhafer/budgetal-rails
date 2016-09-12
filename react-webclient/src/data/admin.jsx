import {getRequest} from './api';

module.exports = {
  users() {
    return getRequest('/admin/users');
  }
}
