import React from 'react';
import classNames from 'classnames';
import InputField from './forms/input_field';
import {numberToCurrency} from '../utils/helpers';
import {keys} from 'lodash';
import {updateBudget} from '../data/Budget';

export default class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
  }

  updateBudget = (e) => {
    const updatedBudget = Object.assign({}, this.props.budget, {monthly_income: e.target.value})
    this.props.updateBudget({budget: updatedBudget});
  }

  persistBudget = async (budget) => {
    try {
      const resp = await updateBudget(budget);
      if (!!resp.errors) {
        const budgetWithErrors = Object.assign({}, budget, {errors: resp.errors});
        this.props.updateBudget({budget: budgetWithErrors})
      } else {
        const updatedBudget = Object.assign({}, budget, resp);
        this.props.updateBudget({budget: resp})
        showMessage('Updated Budget');
      }
    } catch(err) {
      apiError(err.message);
    }
  }

  saveBudget(budget, e) {
    e.preventDefault();
    this.persistBudget(budget)
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
    const messageClass = classNames({
      'alert-color': this.props.notBudgeted < 0,
      'blue-color': this.props.notBudgeted == 0
    })
    const budget = this.props.budget
    return (
      <form data-abide onSubmit={this.saveBudget.bind(this, budget)}>
        <div className="row">
          <div className="large-5 medium-5 columns">
            <div>
              <label htmlFor='monthly_income'>Monthly Income</label>
              <InputField id='monthly_income' required onChange={this.updateBudget} type='number' name='monthly_income' step='any' min='0.00' placeholder='0.00' value={this.props.budget.monthly_income} errors={budget.errors} />
            </div>
            <div>
              <button type="submit" className='tiny button radius success expand'>
                <i className='fi-icon fi-check'></i> Save Income
              </button>
            </div>
          </div>
          <div className="large-7 medium-7 columns text-center">
            <br /><h5 className={messageClass}>{this.budgetedMessage(this.props.notBudgeted)}</h5>
          </div>
        </div>
      </form>
    );
  }
}
