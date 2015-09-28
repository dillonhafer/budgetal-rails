var AnnualBudgetItem = React.createClass({
  paid: function() {
    var text = this.props.budgetItem.paid ? 'Paid' : 'Not Paid'
    var css  = 'label radius '
    css += this.props.budgetItem.paid ? 'success' : 'alert'
    return (<span className={css}>{text}</span>)
  },
  dueDate: function(date) {
    var months = {
      '01': 'Janurary',
      '02': 'Feburary',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    }
    if (!date) {
      date = new Date
      date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }
    var dateParts = date.split('-')
    var year = dateParts[0]
    var month = months[dateParts[1]]
    var day = parseInt(dateParts[2])
    return `${month} ${day}, ${year}`
  },
  hideTable: function() {
    return this.props.budgetItem.id === undefined
  },
  render: function() {
    let classes = classNames({
      'no-container': true,
      hide: this.hideTable()
    });
    return (
      <li className={classes}>
        <ul className="pricing-table">
          <li className="title">{ this.props.budgetItem.name }</li>
          <li className="price">{ numberToCurrency(this.props.budgetItem.amount) }</li>
          <li className="description"><b>Due:</b> { this.dueDate(this.props.budgetItem.due_date) }</li>
          <li className="bullet-item">{ numberToCurrency(this.props.budgetItem.amount / 12) } / month</li>
          <li className="bullet-item">{ this.paid() }</li>
        </ul>
      </li>
    )
  }
});
