import React, { Component } from 'react';
import { numberToCurrency } from '../utils/helpers';
import { Popover, Tag } from 'antd';

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  render() {
    const { date, month } = this.props;

    let classNames = ['month'];

    let div = (
      <div style={{ textAlign: 'center' }}>
        <Tag color="blue">
          {numberToCurrency(month.extra)} / {numberToCurrency(month.principal - month.extra)}
        </Tag>
        <br />
        <Tag color="red">
          {numberToCurrency(month.interest)}
        </Tag>
        <h3>{numberToCurrency(month.balance)}</h3>
      </div>
    );

    if (this.state.focused) {
      classNames.push('focus');
    } else {
      classNames = [...classNames.filter(n => n !== 'focus')];
    }

    let color = '#ccc';
    if (!month.early && date.format('M') === '1') {
      color = 'gray';
      classNames.push('year');
    }

    if (month.pastMonth) {
      classNames.push('past');
      color = '#68d453';
      if (date.format('M') === '1') {
        color = '#268a31';
      }
      div = <div>Paid Month</div>;
    }

    if (month.early) {
      color = '#76abff';
      div = <div>Paid Early!</div>;
    }

    return (
      <Popover
        content={
          <span className="paymentPopover">
            <div style={{ textAlign: 'center' }}>
              <b>
                {date.format('MMMM YYYY')}
              </b>
            </div>
            {div}
          </span>
        }
      >
        <Tag color={color} />
      </Popover>
    );
  }
}

export default Month;
