import React from 'react';
import InputField from './forms/input_field';
import PredictedExpenses from './forms/predicted_expenses';
import {numberToCurrency} from '../utils/helpers';
import {createExpense, updateExpense, destroyExpense, predictionsExpense} from '../data/BudgetItemExpense';
import {debounce} from 'lodash';
import Confirm from '../utils/confirm';

export default class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.predict = debounce(this._predict, 500)
  }

  static propTypes = {
    expense: React.PropTypes.object.isRequired,
  }

  state = {predictions: [],deleteModalHidden: true};

  _predict = async() => {
    try {
      const word = this.props.expense.name
      if (word.length > 2) {
        const predictions = await predictionsExpense(word);
        if (predictions !== null)
          this.setState({predictions})
      } else {
        this.removePredictions();
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  persistExpense = async(expense) => {
    try {
      const isPersisted = expense.id !== undefined;
      const strategy = isPersisted ? updateExpense : createExpense;
      const updateStrategy = isPersisted ? this.props.updateBudgetItemExpense : this.props.saveBudgetItemExpense;

      const resp = await strategy(expense);
      if (!!resp.errors) {
        const expenseWithErrors = Object.assign({}, expense, {errors: response.errors})
        this.props.updateBudgetItemExpense(expenseWithErrors)
      } else {
        showMessage(`Saved ${resp.name}`)
        updateStrategy(resp)
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  save = (e) => {
    e.preventDefault()
    this.persistExpense(this.props.expense)
  }

  update = (expense,e) => {
    const isDatePicker = typeof(e) === 'string';
    if (isDatePicker) {
      var fakeTarget = {name: 'date', value: e};
      e = {target: fakeTarget};
    }

    const updatedExpense = Object.assign({}, expense, {[e.target.name]: e.target.value})
    this.props.updateBudgetItemExpense(updatedExpense)

    // Predict expense
    if (e.target.name === 'name') { this.predict() }
  }

  select = (word) => {
    const updatedExpense = Object.assign({}, this.props.expense, {name: word});
    this.props.updateBudgetItemExpense(updatedExpense);
    this.removePredictions();
  }

  deleteExpense = async() => {
    try {
      if (this.props.expense.id !== undefined) {
        const resp = destroyExpense(this.props.expense.id);
        if (resp !== null) {
          showMessage("Deleted "+this.props.expense.name);
          this.onDeleteCancel();
        }
      }

      this.props.deleteBudgetItemExpense(this.props.expense)
    } catch(err) {
      apiError(err.message)
    }
  }

  persistedOnDeleteClick = (e) => {
    e.preventDefault()
    this.setState({deleteModalHidden: false})
  }

  onDeleteClick = (e) => {
    e.preventDefault()
    this.props.deleteBudgetItemExpense(this.props.expense);
  }

  onDeleteCancel = (e) => {
    this.setState({deleteModalHidden: true})
  }

  removePredictions = (e) => {
    this.setState({predictions: []})
  }

  render() {
    const expense = this.props.expense;
    const isPersisted = expense.id > 0;
    const formClass = isPersisted ? '' : 'not-persisted';
    const deleteFunction = isPersisted ? this.persistedOnDeleteClick : this.onDeleteClick;

    return (
      <form onSubmit={this.save} className={formClass} data-abide>
        <div className='row'>
          <div className="large-2 medium-2 columns">
            <InputField type='date' date={expense.date} onChange={this.update.bind(this,expense)} name='date' errors={expense.errors} />
          </div>
          <div className="large-2 medium-2 columns">
            <InputField type='text' required={true} onBlur={this.removePredictions} name='name' placeholder='(Rent Payment)' onChange={this.update.bind(this, expense)} value={expense.name} className='expense-item-field' errors={expense.errors} />
            <PredictedExpenses select={this.select} predictions={this.state.predictions} />
          </div>
          <div className="large-2 medium-2 columns">
            <InputField type='number' required={true} name='amount' placeholder='0.00' onChange={this.update.bind(this, expense)} defaultValue={numberToCurrency(expense.amount,'')} value={expense.amount} step='any' min='0.01' className='expense-item-field' errors={expense.errors} />
          </div>
          <div className='large-6 medium-6 columns'>
            <button type='submit' title='Save Expense' className='tiny success radius button'><i className='fi-icon fi-check'></i> Save</button>
            &nbsp;
            <a href='#' onClick={deleteFunction} title='Delete Expense' className='tiny alert radius button'><i className='fi-icon fi-trash'></i> Delete</a>
          </div>
        </div>
        <Confirm name={expense.name}
                 hidden={this.state.deleteModalHidden}
                 cancel={this.onDeleteCancel}
                 delete={this.deleteExpense} />
      </form>
    );
  }
}
