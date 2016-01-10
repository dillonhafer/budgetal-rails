import {getRequest} from './api';

export default {
  users() {
    return getRequest('/admin/users');
  }
}
