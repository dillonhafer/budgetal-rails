import React from 'react';
import classNames from 'classnames';
import {numberToCurrency, monthName} from '../../utils/helpers';

export default class AnnualBudgetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired
  };

  paidLabel(isPaid) {
    var classes = classNames('label radius', {success: isPaid, alert: !isPaid});
    return (<span className={classes}>{isPaid ? 'Paid' : 'Not Paid'}</span>);
  }

  dueDate(date) {
    date = new Date(date);
    var parts = {
      year: date.getFullYear(),
      month: monthName(date.getMonth()+1),
      day: parseInt(date.getDate())
    };
    return `${parts.month} ${parts.day}, ${parts.year}`;
  }

  render() {
    let item    = this.props.budgetItem
    let hide    = item.id === undefined;
    let classes = classNames('no-container', {hide});
    return (
      <li className={classes}>
        <ul className="pricing-table">
          <li className="title">{ item.name }</li>
          <li className="price">{ numberToCurrency(item.amount) }</li>
          <li className="description"><b>Due:</b> { this.dueDate(item.due_date) }</li>
          <li className="bullet-item">{ numberToCurrency(item.amount / 12) } / month</li>
          <li className="bullet-item">{ this.paidLabel(item.paid) }</li>
        </ul>
      </li>
    );
  }
}
