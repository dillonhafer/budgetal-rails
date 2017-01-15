import React from 'react';
import BudgetFormContainer from '../containers/BudgetFormContainer';
import Highchart from './highchart';
import {numberToCurrency} from '../utils/helpers';
import classNames from 'classnames';

import {
  Button,
  Icon,
  Modal,
  Progress
} from 'antd';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
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

  status() {
    return this.props.amountRemaining < 0 ? 'exception' : 'normal'
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

  showIncomeModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleIncomeOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleIncomeCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  leftToBudget = () => {
    const left = this.props.monthlyIncome - this.props.amountBudgeted;
    switch (true) {
      case left > 0:
        return <p>
          You still need to budget <strong>{numberToCurrency(left)}</strong>
        </p>
      case left < 0:
        return <p className='alert-color'>
          Oh-no! You have over budgeted by <strong>{numberToCurrency(Math.abs(left))}</strong>
        </p>
      default:
        return <p className='primary-color'>Congratulations! You have a zero-based budget!</p>;
    }
  }

	render() {
    const spent = this.percentSpent();
    const status = this.status();
		return (
			<div className='large-6 medium-6 large-offset-1 columns overview-partial'>
        <div className='row collapse monthly-overview-stats'>
          <div className='large-12 medium-12 columns header-row'>
            <h3>
              <span>Monthly Overview</span>
              <span className="right">
                <Button type="primary" onClick={this.showIncomeModal}>
                  <Icon type="edit" />
                </Button>
              </span>
            </h3>
          </div>
          <div className="body-row">
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
                    <Progress strokeWidth={20} status={status} percent={spent} />
                  </div>
                </div>
                <br />
                <BudgetFormContainer visible={this.state.visible}
                       onOk={this.handleIncomeOk}
                       onCancel={this.handleIncomeCancel} />
                <div className='text-center'>
                  <p>
                    You have budgeted <strong>{numberToCurrency(this.props.amountBudgeted)}</strong> out
                    of <strong>{numberToCurrency(this.props.monthlyIncome)}</strong>
                  </p>
                  {this.leftToBudget()}
                  <Progress type="circle" status={status} percent={spent} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
		);
	}
}
