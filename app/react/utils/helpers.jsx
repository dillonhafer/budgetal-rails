export function monthName(number) {
  var months = [
    'Janurary',
    'Feburary',
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