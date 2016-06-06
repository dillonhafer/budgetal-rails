'use strict';

import {alert} from './window';
import AppImages from '../../components/app_images';

var ViewHelpers = {
  showErrors(errors) {
    let message = '';
    _.keys(errors).map(field => {
      errors[field].map(err => {
        let niceField = _.startCase(field);
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
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  dueDate: function(date) {
    date = new Date(date)
    return date.toLocaleDateString();
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
  }
};

module.exports = ViewHelpers;
