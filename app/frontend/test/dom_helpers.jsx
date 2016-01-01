import _ from 'lodash';

export default {
  elFactory(options) {
    var el = document.createElement(options.tag);
    _.map(options.attributes, function(value, key) {
      el.setAttribute(key, value);
    });
    el.innerHTML = options.text;
    return el;
  }
}