import React from 'react';
import classNames from 'classnames';
import InputField from '../Forms/input_field';
import {numberToCurrency} from '../Utils/helpers';

export default class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_income: 0.00,
      not_budgeted: 0.00
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      monthly_income: parseFloat(newProps.budget.monthly_income),
      not_budgeted: parseFloat(newProps.budget.not_budgeted)
    })
  }

  updateBudget(monthly_income, a) {
    var income = monthly_income.target.value
    var not_budgeted = income - this.props.budget.budgeted
    this.setState({monthly_income: income, not_budgeted: not_budgeted});
  }

  saveBudget(budget, e) {
    e.preventDefault();
    budget.monthly_income = this.state.monthly_income
    this.props.saveBudget(budget)
  }

  budgetedMessage(not_budgeted) {
    if (not_budgeted > 0) {
     return `You have ${numberToCurrency(not_budgeted)} Remaining to budget`
    } else if (not_budgeted < 0) {
     return `Oh no! You have over-budgeted by ${numberToCurrency(Math.abs(not_budgeted))}!`
    } else {
     return `Congratulations! You have budgeted all your income!`
    }
  }

  render() {
    var messageClass = classNames({
      'alert-color': this.state.not_budgeted < 0,
      'blue-color': this.state.not_budgeted == 0
    })
    var budget = this.props.budget
      return (
      <form data-abide onSubmit={this.saveBudget.bind(this, budget)}>
        <div className="row">
          <div className="large-5 medium-5 columns">
            <div>
              <label htmlFor='monthly_income'>Monthly Income</label>
              <InputField id='monthly_income' required onChange={this.updateBudget} type='number' name='monthly_income' step='any' min='0.00' required placeholder='0.00' value={this.state.monthly_income} errors={budget.errors} />
            </div>
            <div>
              <button type="submit" className='tiny button radius success expand'>
                <i className='fi-icon fi-check'></i> Save Income
              </button>
            </div>
          </div>
          <div className="large-7 medium-7 columns text-center">
            <br /><h5 className={messageClass}>{this.budgetedMessage(this.state.not_budgeted)}</h5>
          </div>
        </div>
      </form>
    );
  }
}
