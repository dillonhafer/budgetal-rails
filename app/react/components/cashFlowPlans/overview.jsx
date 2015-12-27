import React from 'react';
import BudgetForm from '../budgets/budget_form';
import Highchart from '../highchart';
import {numberToCurrency} from '../../utils/helpers';
import classNames from 'classnames';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  percentSpent() {
    var p = this.props.budget.spent / this.props.budget.budgeted * 100;
    return p > 99 ? 100 : parseInt(p);
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
      'red-meter': this.props.budget.remaining < 0
    });
  }

  remainingClasses() {
    return classNames({
      'right remaining': true,
      'alert-color': this.props.budget.remaining < 0,
      'blue-color': this.props.budget.remaining > 0
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
    var budget = this.props.budget
		return (
			<div className='large-6 medium-6 large-offset-1 columns overview-partial'>
        <div className='row collapse monthly-overview-stats'>
          <div className='large-12 medium-12 columns header-row'>
            <h3>Monthly Overview</h3>
          </div>
          <div className="small-12 large-12 medium-12 columns">
            <ul>
              <li>
                <div className="row">
                  <div className="large-12 medium-12 columns">
                    <span className='spent success-color'>
                      Spent: {numberToCurrency(budget.spent)}
                    </span>
                    <span className={this.remainingClasses()}>
                      Remaining: {numberToCurrency(budget.remaining)}
                    </span>
                    <div className="progress radius">
                      <span className={this.meterClasses()} style={this.meterWidth()}></span>
                    </div>
                  </div>
                </div>
                <hr />
                <BudgetForm budget={budget} saveBudget={this.props.saveBudget} />
                <Highchart config={this.chartConfig()} />
              </li>
            </ul>
          </div>
        </div>
      </div>
		);
	}
}
