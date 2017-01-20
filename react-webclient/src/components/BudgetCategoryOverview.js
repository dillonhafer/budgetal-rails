import React from 'react';
import classNames from 'classnames';
import { numberToCurrency } from '../utils/helpers';
import { Progress } from 'antd';

export default class BudgetCategoryOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  percentOfBudget() {
    return parseInt(this.props.amountBudgeted / this.props.monthlyIncome * 100);
  }

  percentSpent() {
    var p = this.props.amountSpent / this.props.amountBudgeted * 100;
    if (isNaN(p)) {
      return 0
    } else if (p > 99) {
      return 100
    } else {
      return parseInt(p)
    }
  }

  meterWidth() {
    var width = `${this.percentSpent()}%`
    return {
      width: width
    }
  }

  status() {
    if (this.props.amountRemaining < 0) {
      return 'exception';
    } else if (this.props.amountRemaining === 0) {
      return 'success';
    }
  }

  remainingClasses() {
    return classNames({
      'right remaining': true,
      'alert-color': this.props.amountRemaining < 0,
      'blue-color': this.props.amountRemaining >= 0
    });
  }

  chartConfig() {
    var data = [
            {y: parseFloat(this.percentSpent()), name: 'Spent'},
            {y: parseFloat(100 - this.percentSpent()), name: 'Remaining'}
          ]
    return { series: [{data}]
    }
  }

  render() {
    const spent = this.percentSpent();
    const status = this.status();
    return (
      <div className='large-5 medium-5 columns'>
        <div className='header-row'>
          <h3>{this.props.categoryName} Overview</h3>
        </div>
        <div className='body-row category-overview'>
          <ul>
            <li>
              <span className='spent success-color'>
                Spent: {numberToCurrency(this.props.amountSpent)}
              </span>
              <span className={this.remainingClasses()}>
                Remaining: {numberToCurrency(this.props.amountRemaining)}
              </span>
              <Progress strokeWidth={20} status={status} percent={spent} />
              <br />
              <br />
              <div className='text-center'>
                <p>
                  You have budgeted <b>{numberToCurrency(this.props.amountBudgeted)} ({this.percentOfBudget()}%)</b> towards {this.props.categoryName}, we recommend you budget somewhere between <b>{this.props.recommendedPercentage}</b>.
                </p>
                <Progress type="circle" status={status} percent={spent} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
