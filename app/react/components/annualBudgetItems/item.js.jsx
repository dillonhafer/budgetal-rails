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

  paid = () => {
    var isPaid  = this.props.budgetItem.paid;
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

  hideTable = () => {
    return this.props.budgetItem.id === undefined;
  }

  render() {
    let classes = classNames('no-container', {hide: this.hideTable()});
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
    );
  }
}
