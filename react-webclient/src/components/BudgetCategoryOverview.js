import React from 'react';
import classNames from 'classnames';
import Highchart from './highchart';
import _ from 'lodash';
import {numberToCurrency} from '../utils/helpers';

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

  meterClasses() {
    return classNames({
      'meter': true,
      'red-meter': this.props.amountRemaining < 0
    });
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
    return {
      series: [{data}]
    }
  }

  render() {
    return (
      <div className='large-5 medium-5 columns'>
        <div className='header-row'>
          <h3>{this.props.categoryName} Overview</h3>
        </div>
        <div className='category-overview'>
          <ul>
            <li>
              <span className='spent success-color'>
                Spent: {numberToCurrency(this.props.amountSpent)}
              </span>
              <span className={this.remainingClasses()}>
                Remaining: {numberToCurrency(this.props.amountRemaining)}
              </span>
              <div className="progress radius" title={this.percentSpent()+'%'}>
                <span className={this.meterClasses()} style={this.meterWidth()}></span>
              </div>
              <hr />
              <p>
                You have budgeted {numberToCurrency(this.props.amountBudgeted)} ({this.percentOfBudget()}%) towards {this.props.categoryName}, we recommend you only budget {this.props.recommendedPercentage}.
              </p>
              <Highchart config={this.chartConfig()} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
