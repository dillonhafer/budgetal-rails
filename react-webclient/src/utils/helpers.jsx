import _ from 'lodash';
import parser from 'ua-parser-js';

export default {
  currentUser() {
    return getFromStorage('user');
  },

  currentSession() {
    return getFromStorage('session');
  },

  userAuthenticated() {
    return _.keys(module.exports.currentUser()).length;
  },

  humanUA(userAgent) {
    let ua = parser(userAgent);
    let text = `${ua.browser.name} ${ua.browser.major} on ${ua.os.name}`
    if (ua.ua.includes('Budgetal')) {
      text = 'Budgetal App on iOS';
    }
    return text;
  },

  title(string) {
    document.title = `${string} | Budgetal`;
  },

  pluralize(count, singlular, plural) {
    let word = plural;
    if (count === 1)
      word = singlular;

    return `${count} ${word}`;
  },

  remainingClass(number) {
    if (_.lt(number, 0.00)) {
      return 'alert-color';
    } else if (_.gt(number, 0.00)) {
      return 'success-color';
    } else {
      return 'blue-color';
    }
  },

  today() {
    var date  = new Date;
    var year  = date.getFullYear();
    var month = pad(date.getMonth() + 1);
    var day   = pad(date.getDate());
    return `${year}-${month}-${day}`;
  },

  monthName(number) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return months[parseInt(number)-1]
  },

  selectedValue(selector) {
    var element = document.querySelector(selector);
    return element.options[element.selectedIndex].value;
  },

  numberToCurrency(number, dollarSign='$') {
    if (isNaN(parseFloat(number))) { number = 0 }
    var group3Regex = /(\d)(?=(\d{3})+\.)/g
    var number = parseFloat(number).toFixed(2);
    return dollarSign + number.replace(group3Regex, '$1,');
  },

  yearOptions() {
    let maxYear = (new Date).getFullYear() + 3;
    let years = _.range(2015, maxYear);
    return _.map(years, (year, index) => {
      return (<option key={index} value={year}>{year}</option>);
    });
  },

  monthOptions() {
    let months = _.range(1, 13);
    return _.map(months, (month, index) => {
      return (<option key={index} value={month}>{module.exports.monthName(month)}</option>);
    });
  }
}

function pad(number, char='0') {
  if (number < 10) {
    number = `${char}${number}`;
  }
  return number;
}

function getFromStorage(key) {
  let item = localStorage.getItem(key);
  if (item === null)
    item = '{}'

  return JSON.parse(item);
}
