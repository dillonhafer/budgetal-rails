import React, { Component } from 'react';
import { numberToCurrency } from '../utils/helpers';

class MonthListItem extends Component {
  render() {
    const { date, month } = this.props;

    const classNames = date.format('MMMM') === 'January' ? 'newYear' : '';

    return (
      <tr className={classNames}>
        <td>
          {date.format('MMMM YYYY')}
        </td>
        <td>
          {numberToCurrency(month.principal + month.interest)}
        </td>
        <td>
          {numberToCurrency(month.principal)}
        </td>
        <td>
          {numberToCurrency(month.interest)}
        </td>
        <td>
          {numberToCurrency(month.balance)}
        </td>
      </tr>
    );
  }
}

export default MonthListItem;
