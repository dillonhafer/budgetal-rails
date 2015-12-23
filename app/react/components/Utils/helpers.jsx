export function monthName(number) {
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
  return months[number]
}

export function selectedValue(selector) {
  var element = document.querySelector(selector);
  return element.options[element.selectedIndex].value;
}

export function numberToCurrency(number, dollarSign) {
  if (dollarSign === undefined) {
    dollarSign = '$'
  }
  if (isNaN(parseFloat(number))) {
    number = 0
  }
  return dollarSign + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}