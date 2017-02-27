import {
  gt,
  keys,
  lt,
  map,
  padStart,
  range,
  reduce,
  round,
  startCase,
} from 'lodash'
import parser from 'ua-parser-js';
import moment from 'moment';

module.exports = {
  reduceSum(array, property='amount') {
   return reduce(array, (total, item) => {
      const sum = parseFloat(total) + parseFloat(item[property]);
      return round(sum, 2);
    }, 0.00);
  },
  addDecimal(original, amount) {
    const wholeNumber = amount % 1 === 0;
    let newAmount = amount

    if (wholeNumber) {
      newAmount = amount + (original - Math.floor(original))
    }

    if (newAmount < 0) {
      newAmount = 0;
    }

    return newAmount.toFixed(2);
  },
  prettyServerErrors(errors) {
    const errs = keys(errors).map(key => {
      return errors[key].map(msg => {
        return <p><b>{startCase(key)}</b> {msg}</p>
      });
    });
    return <div>{errs}</div>
  },
  currentUser() {
    return getFromStorage('user');
  },
  currentSession() {
    return getFromStorage('session');
  },
  userAuthenticated() {
    return keys(module.exports.currentUser()).length;
  },
  humanUA(userAgent) {
    const ua = parser(userAgent);
    let text = `${ua.browser.name} ${ua.browser.major} on ${ua.os.name}`
    if (ua.ua.includes('Budgetal')) {
      text = 'Budgetal App on iOS';
    }
    return text;
  },
  title(string) {
    let title = 'Budgetal';
    if (string.length) {
      title = `${string} | Budgetal`;
    }
    document.title = title;
  },
  pluralize(count, singlular, plural) {
    let word = plural;
    if (count === 1)
      word = singlular;

    return `${count} ${word}`;
  },
  remainingClass(number) {
    if (lt(number, 0.00)) {
      return 'alert-color';
    } else if (gt(number, 0.00)) {
      return 'success-color';
    } else {
      return 'blue-color';
    }
  },
  today() {
    const date  = new Date;
    const year  = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day   = pad(date.getDate());
    return `${year}-${month}-${day}`;
  },
  monthName(number) {
    const months = [
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
    const element = document.querySelector(selector);
    return element.options[element.selectedIndex].value;
  },
  numberToCurrency(number, dollarSign='$') {
    if (isNaN(parseFloat(number))) { number = 0 }
    const group3Regex = /(\d)(?=(\d{3})+\.)/g
    const newNumber = parseFloat(number).toFixed(2);
    return dollarSign + newNumber.replace(group3Regex, '$1,');
  },
  currency(number, dollarSign='$') {
    return module.exports.numberToCurrency(number, dollarSign);
  },
  yearOptions() {
    const maxYear = (new Date).getFullYear() + 3;
    const years = range(2015, maxYear);
    return map(years, (year, index) => {
      return (<option key={index} value={year}>{year}</option>);
    });
  },
  availableYears() {
    return range(2015, (new Date).getFullYear() + 3);
  },
  monthOptions() {
    const months = range(1, 13);
    return map(months, (month, index) => {
      return (<option key={index} value={month}>{module.exports.monthName(month)}</option>);
    });
  },
  budgetMonth(budget) {
    const {month,year} = budget;
    if (month && year) {
      return moment(`${year}-${padStart(month, 2, '0')}-01`).format("MMMM YYYY");
    }
  },
  numberStep(newNumber, component) {
    let number  = parseFloat(ReactDOM.findDOMNode(component).querySelector('input').value);
    const stepperUsed = (number - newNumber).toFixed(2) !== "0.00";

    if (stepperUsed) {
      if (newNumber < number) {
        number -= 1.00
      } else {
        number += 1.00
      }
    }

    return number.toString();
  }
}


function pad(number, char='0') {
  if (number < 10) {
    return `${char}${number}`;
  } else {
    return number;
  }
}

function getFromStorage(key) {
  let item = localStorage.getItem(key);
  if (item === null)
    item = '{}'

  return JSON.parse(item);
}
