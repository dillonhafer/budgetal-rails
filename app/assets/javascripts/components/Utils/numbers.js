function numberToCurrency(number, dollarSign) {
  if (dollarSign === undefined) {
    dollarSign = '$'
  }
  if (isNaN(parseFloat(number))) {
    number = 0
  }
  return dollarSign + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}