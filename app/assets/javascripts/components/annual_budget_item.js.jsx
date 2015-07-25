var AnnualBudgetItem = React.createClass({
  paid: function() {
    var text = this.props.budgetItem.paid ? 'Paid' : 'Not Paid'
    var css  = 'label radius '
    css += this.props.budgetItem.paid ? 'success' : 'alert'
    return (<span className={css}>{text}</span>)
  },
  dueDate: function(date) {
    date = (date === undefined) ? new Date : new Date(date + ' EDT')
    var dtf = new Intl.DateTimeFormat(["en-US"], {
      year: "numeric",
      day: "numeric",
      month: "long",
      timeZone: 'America/New_York'
    })
    return dtf.format(date)
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
