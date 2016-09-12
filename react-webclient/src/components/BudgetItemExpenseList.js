import React from 'react';
import {map, groupBy, sortBy} from 'lodash';
import {monthName} from '../utils/helpers';
import BudgetItemExpenseContainer from '../containers/BudgetItemExpenseContainer';
import {find} from 'lodash'
import classNames from 'classnames';

export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
		expenses: React.PropTypes.array.isRequired,
		budgetItemId: React.PropTypes.number.isRequired,
  }

	headerRow(noExpenses) {
		if (!noExpenses)
			return (
				<div className='row expense-header-row'>
				  <div className='large-2 medium-2 columns'>&nbsp;</div>
          <div className='large-10 columns'>
            <div className="large-2 medium-2 columns"><label>Date</label></div>
            <div className="large-2 medium-2 columns"><label>Name</label></div>
            <div className="large-2 medium-2 columns"><label>Amount</label></div>
            <div className='large-6 medium-6 columns'>&nbsp;</div>
          </div>
				</div>
			)
	}

	noExpensesMessage(noExpenses) {
		if (noExpenses)
			return(<p className='no-expenses'>You haven't added any expenses yet</p>)
	}

  newExpense = (expense, index) => {
    return <BudgetItemExpenseContainer index={index}
                                       key={index}
                                       expense={expense} />
  }

  renderSections(sections) {
    return map(sections, (expenses, date) => {
      const [year,month,day] = date.split('-')
      return (
        <div key={date} className='row expense-section'>
          <div className='large-2 columns expense-date'>
            {monthName(month).slice(0,3)} {day}, {year}
          </div>
          <div className='large-10 columns expense-data'>
            {map(expenses, this.newExpense)}
          </div>
        </div>
      )
    })
  }

  newExpenseHandler = (e) => {
    e.preventDefault();
    this.props.newBudgetItemExpense(this.props.budgetItemId);
  }

  addExpenseLink(expenses, newFunction) {
    const noNewExpenses = find(expenses, (expense) => (expense.id === undefined)) === undefined
    const classes       = classNames('add-expense-link tiny button radius success', {disabled: !noNewExpenses})
    const onClickHandle = noNewExpenses ? newFunction : (e) => e.preventDefault();

    return (
      <div className='add-expense-link-row'>
        <a href='#' onClick={onClickHandle} className={classes} disabled={!noNewExpenses}>
          <i className='fi-icon fi-plus'></i> Add an expense
        </a>
      </div>
    )
  }

	render() {
    const sections = groupBy(sortBy(this.props.expenses, 'date'), 'date');
    const noExpenses = !this.props.expenses.length;
		return (
			<div className={this.props.className}>
				<div className="fields">
					{this.headerRow(noExpenses)}
          {this.renderSections(sections)}
          {this.noExpensesMessage(noExpenses)}
          {this.addExpenseLink(this.props.expenses, this.newExpenseHandler)}
				</div>
			</div>
		);
	}
}
