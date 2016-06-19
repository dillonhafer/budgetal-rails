'use strict';

import {alert} from './window';
import AppImages from '../images/AppImages';
import {keys,startCase} from 'lodash-node'
import parser from 'ua-parser-js';

const ViewHelpers = {
  showErrors(errors) {
    let message = '';
    keys(errors).map(field => {
      errors[field].map(err => {
        const niceField = startCase(field);
        message += `${niceField} ${err}\n`;
      })
    })
    alert({title: 'Errors', message});
  },
  numberToCurrency: function(number, dollarSign) {
    dollarSign = (dollarSign === undefined) ? '$' : dollarSign
    number = (isNaN(parseFloat(number))) ? 0 : number
    return dollarSign + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  },
  dueDate: function(date) {
    const [y,m,d] = date.split('-');
    return new Date(y,m-1,d).toLocaleDateString();
  },
  monthName: function(index) {
    var months = {
      '1': 'Janurary',
      '2': 'Feburary',
      '3': 'March',
      '4': 'April',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'August',
      '9': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    return months[String(index+1)]
  },
  categoryIcon(categoryName) {
    if (categoryName == "Medical/Health")
      return AppImages.health;
    else {
      return AppImages[categoryName.toLowerCase()];
    }
  },
  pluralize(count, singlular, plural) {
    let word = plural;
    if (count === 1)
      word = singlular;

    return `${count} ${word}`;
  },
  fullSessionDate(date) {
    let sessionDate = new Date(date);
    return `${sessionDate.toDateString()} at ${sessionDate.toLocaleTimeString()}`;
  },
  sessionDate(currentTime, date) {
    let startDate = new Date(date);
    let secs = Math.floor((currentTime - startDate.getTime()) / 1000);
    if (secs < 3600) return `${ViewHelpers.pluralize(Math.floor(secs / 60), 'minute', 'minutes')} ago`;
    if (secs < 86400) return `${ViewHelpers.pluralize(Math.floor(secs / 3600), 'hour', 'hours')} ago`;
    if (secs < 604800) return `${ViewHelpers.pluralize(Math.floor(secs / 86400), 'day', 'days')} ago`;
    return ViewHelpers.fullSessionDate(date);
  },
  humanUA(userAgent) {
    let ua = parser(userAgent);
    let text = `${ua.browser.name} ${ua.browser.major} on ${ua.os.name}`
    if (ua.ua.includes('Budgetal')) {
      text = 'Budgetal App on iOS';
    }
    return text;
  },
};

module.exports = ViewHelpers;
