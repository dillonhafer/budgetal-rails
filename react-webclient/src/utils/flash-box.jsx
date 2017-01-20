import { notification } from 'antd';

module.exports = {
  showMessage(description, type="success") {
    notification[type]({
      message: capitalize(type),
      description
    });
  },
  showError(description) {
    module.exports.showMessage(description, "error");
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
