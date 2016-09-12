import {map} from 'lodash';

module.exports = {
  elFactory(options) {
    var el = document.createElement(options.tag);
    map(options.attributes, function(value, key) {
      el.setAttribute(key, value);
    });
    el.innerHTML = options.text;
    return el;
  }
}