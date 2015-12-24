export default {
  monthName(number) {
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
  },

  selectedValue(selector) {
    var element = document.querySelector(selector);
    return element.options[element.selectedIndex].value;
  },

  numberToCurrency(number, dollarSign='$') {
    if (isNaN(parseFloat(number))) { number = 0 }
    var replaceRegex = /(\d)(?=(\d{3})+\.)/g
    var number = parseFloat(number).toFixed(2);
    return dollarSign + number.replace(replaceRegex, '$1,');
  }
}