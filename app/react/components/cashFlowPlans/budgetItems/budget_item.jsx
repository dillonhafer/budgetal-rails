import React from 'react';
import classNames from 'classnames';
import InputField from '../../forms/input_field';
import _ from 'lodash';
import ExpenseList from './budgetItemExpenses/expense_list';
import {numberToCurrency} from '../../../utils/helpers';

export default class BudgetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired,
    expenseFunctions: React.PropTypes.object.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  }

  state = { hideExpenses: true }

  spent() {
    let expenses = this.props.budgetItem.budget_item_expenses
    return _.reduce(expenses, function(total, expense, index) {
      let sum = parseFloat(total) + parseFloat(expense.amount);
      return _.round(sum, 2);
    }, 0.00);
  }

  remaining() {
    return this.props.budgetItem.amount_budgeted - this.spent();
  }

  update(item,e) {
    item[e.target.name] = e.target.value
    this.props.update(this.props.index, item)
  }

  save = (e) => {
    e.preventDefault()
    var item = this.props.budgetItem
    item.index = this.props.index
    this.props.save(this.props.budgetItem)
  }

  delete = (e) => {
    e.preventDefault()
    this.props.delete(this.props.budgetItem, this.props.index)
  }

  toggleExpenses = (e) => {
    e.preventDefault();
    if (this.props.budgetItem.budget_item_expenses) {
      this.setState({hideExpenses: !this.state.hideExpenses});
    }
  }

  remainingClass() {
    var item = this.props.budgetItem;
    return classNames({
      'success-color': this.remaining() > 0,
      'alert-color': this.remaining() < 0,
      'blue': Math.abs(numberToCurrency(this.remaining(), '')) == 0
    });
  }

  drag = (e) => {
    e.dataTransfer.setData('budget_item_id', this.props.budgetItem.id)
    e.dataTransfer.setData('original_category_id', this.props.budgetItem.budget_category_id)
  }

  render() {
    let item = this.props.budgetItem;
    var expensesClasses = classNames('expense-list', {hide: this.state.hideExpenses, fadeIn: !this.state.hideExpenses})
    var toggleClasses = classNames('fi-play move-cursor', {'expanded-list': !this.state.hideExpenses})
    return (
      <div>
        <div className='row'>
          <form onSubmit={this.save} data-abide>
            <div className="large-4 medium-4 columns budget-item-name">
              <a href='#' onClick={this.toggleExpenses} className='show-expenses'><i draggable onDragStart={this.drag} className={toggleClasses}></i></a>
              <InputField onChange={this.update.bind(this, item)} required={true} type='text' name='name' placeholder='Name' value={item.name} errors={item.errors} />
            </div>
            <div className="large-1 medium-1 columns text-right budget-item-amount-spent">
              {numberToCurrency(this.spent())}
            </div>
            <div className="large-2 medium-2 columns text-right budget-item-amount-budgeted">
              <InputField onChange={this.update.bind(this, item)} required={true} type='number' name='amount_budgeted' step='any' min='0.01' required placeholder='0.00' defaultValue={numberToCurrency(this.amount_budgeted, '')} value={item.amount_budgeted} errors={item.errors} />
            </div>
            <div className="large-1 medium-1 columns text-right">
              <span className={this.remainingClass()}>{numberToCurrency(this.remaining())}</span>
            </div>
            <div className='large-4 medium-4 columns'>
              <button type='submit' title='Save Budget Item' className='tiny success radius button'><i className='fi-icon fi-check'></i> Save</button>
              &nbsp;
              <a href='#' onClick={this.delete} title='Delete Budget Item' className='tiny alert radius button'><i className='fi-icon fi-trash'></i> Delete</a>
            </div>
          </form>
        </div>
        <ExpenseList className={expensesClasses} expenses={item.budget_item_expenses} budgetItemId={this.props.budgetItem.id} functions={this.props.expenseFunctions} />
        <ul data-dropdown-content className="f-dropdown"></ul>
      </div>
    );
  }
}