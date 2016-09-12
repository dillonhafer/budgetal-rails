import React from 'react';
import BudgetFormContainer from '../containers/BudgetFormContainer';
import Highchart from './highchart';
import {numberToCurrency} from '../utils/helpers';
import classNames from 'classnames';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  percentSpent() {
    var p = this.props.amountSpent / this.props.amountBudgeted * 100;
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
      'red-meter': this.props.amountRemaining < 0
    });
  }

  remainingClasses() {
    return classNames({
      'right remaining': true,
      'alert-color': this.props.amountRemaining < 0,
      'blue-color': this.props.amountRemaining > 0
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
                      Spent: {numberToCurrency(this.props.amountSpent)}
                    </span>
                    <span className={this.remainingClasses()}>
                      Remaining: {numberToCurrency(this.props.amountRemaining)}
                    </span>
                    <div className="progress radius">
                      <span className={this.meterClasses()} style={this.meterWidth()}></span>
                    </div>
                  </div>
                </div>
                <hr />
                <BudgetFormContainer />
                <Highchart config={this.chartConfig()} />
              </li>
            </ul>
          </div>
        </div>
      </div>
		);
	}
}
