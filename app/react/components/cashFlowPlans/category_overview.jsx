import React from 'react';
import classNames from 'classnames';
import Highchart from '../highchart';
import _ from 'lodash';
import {numberToCurrency} from '../../utils/helpers';

export default class CategoryOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
  	monthlyIncome: 0.00
  }

	budgeted() {
		var items = this.props.category.budget_items
		return items.reduce(function(previousItem, currentItem, index, array) {
		  return parseFloat(previousItem) + parseFloat(currentItem.amount_budgeted);
		}, 0.00);
	}

	percentOfBudget() {
		return parseInt(this.budgeted() / this.props.monthlyIncome * 100);
	}

	remaining() {
		return this.budgeted() - this.spent()
	}

	spent() {
		var expenses = []
		this.props.category.budget_items.map((budget_item, index) => {
			if (budget_item.budget_item_expenses) {
	      budget_item.budget_item_expenses.map((expense) => {
	      	expenses.push(expense)
	      })
		  }
    })

		return expenses.reduce(function(previousExpense, currentExpense, index, array) {
      var sum = parseFloat(previousExpense) + parseFloat(currentExpense.amount);
		  return _.round(sum, 2);
		}, 0.00);
	}

	percentSpent() {
		var p = this.spent() / this.budgeted() * 100;
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
      'red-meter': this.remaining() < 0
    });
	}

	remainingClasses() {
		return classNames({
      'right remaining': true,
      'alert-color': this.remaining() < 0,
      'blue-color': this.remaining() >= 0
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
          <h3>{this.props.category.name} Overview</h3>
        </div>
        <div className='category-overview'>
          <ul>
			      <li>
	            <span className='spent success-color'>
	              Spent: {numberToCurrency(this.spent())}
	            </span>
	            <span className={this.remainingClasses()}>
	              Remaining: {numberToCurrency(this.remaining())}
	            </span>
	            <div className="progress radius" title={this.percentSpent()+'%'}>
	              <span className={this.meterClasses()} style={this.meterWidth()}></span>
	            </div>
			        <hr />
			        <p>
			          You have budgeted {numberToCurrency(this.budgeted())} ({this.percentOfBudget()}%) towards {this.props.category.name}, we recommend you only budget {this.props.category.percentage}.
			        </p>
			        <Highchart config={this.chartConfig()} />
			      </li>
			    </ul>
        </div>
      </div>
		)
	}
}
