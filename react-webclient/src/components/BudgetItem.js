import React from 'react';
import classNames from 'classnames';
import InputField from './forms/input_field';
import BudgetItemExpenseListContainer from '../containers/BudgetItemExpenseListContainer';
import {createItem, updateItem, destroyItem} from '../data/BudgetItem';
import {numberToCurrency} from '../utils/helpers';
import Confirm from '../utils/confirm';

export default class BudgetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired,
  }

  state = { hideExpenses: true, deleteModalHidden: true }

  update = (item,e) => {
    const updatedItem = Object.assign({}, item, {[e.target.name]: e.target.value})
    this.props.updateBudgetItem(updatedItem)
  }

  persistBudgetItem = async(budgetItem) => {
    try {
      const isPersisted = budgetItem.id > 0;
      const strategy = isPersisted ? updateItem : createItem;
      const afterSaveStrategy = isPersisted ? this.props.updateBudgetItem : this.props.saveBudgetItem;
      const resp = await strategy(budgetItem);

      if (!!resp.errors) {
        const budgetItemWithErrors = Object.assign({}, budgetItem, {errors: resp.errors})
        this.props.updateBudgetItem(budgetItemWithErrors)
      } else {
        showMessage(`Saved ${resp.name}`);
        afterSaveStrategy(resp);
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  save = (e) => {
    e.preventDefault();
    this.persistBudgetItem(this.props.budgetItem);
  }

  deleteBudgetItem = async() => {
    try {
      if (this.props.budgetItem.id !== undefined) {
        const resp = destroyItem(this.props.budgetItem.id);
        if (resp !== null) {
          showMessage("Deleted "+this.props.budgetItem.name);
          this.onDeleteCancel();
        }
      }

      this.props.deleteBudgetItem(this.props.budgetItem)
    } catch(err) {
      apiError(err.message)
    }
  }

  toggleExpenses = (e) => {
    e.preventDefault();
    if (this.props.budgetItem.id > 0) {
      this.setState({hideExpenses: !this.state.hideExpenses});
    }
  }

  remainingClass(amountRemaining) {
    return classNames({
      'success-color': amountRemaining > 0,
      'alert-color': amountRemaining < 0,
      'blue': Math.abs(numberToCurrency(amountRemaining, '')) == 0
    });
  }

  drag = (e) => {
    e.dataTransfer.setData('budget_item_id', this.props.budgetItem.id)
    e.dataTransfer.setData('original_category_id', this.props.budgetItem.budget_category_id)
  }

  getExpensesList(budgetItemId, hideExpenses) {
    if (budgetItemId) {
      const expensesClasses = classNames('expense-list', {hide: hideExpenses, fadeIn: !hideExpenses});
      return (
        <div className={expensesClasses}>
          <BudgetItemExpenseListContainer budgetItemId={budgetItemId} />
        </div>
      )
    }
  }

  persistedOnDeleteClick = (e) => {
    e.preventDefault()
    this.setState({deleteModalHidden: false})
  }

  onDeleteClick = (e) => {
    e.preventDefault()
    this.props.deleteBudgetItem(this.props.budgetItem);
  }

  onDeleteCancel = (e) => {
    this.setState({deleteModalHidden: true})
  }

  render() {
    const item = this.props.budgetItem;
    const isPersisted = item.id > 0;
    const toggleClasses = classNames('fi-play move-cursor', {'expanded-list': !this.state.hideExpenses, 'hide': !isPersisted});
    const formClass = isPersisted ? '' : 'not-persisted';
    const deleteFunction = isPersisted ? this.persistedOnDeleteClick : this.onDeleteClick;

    return (
      <div>
        <div className='row'>
          <form onSubmit={this.save} className={formClass} data-abide>
            <div className="large-4 medium-4 columns budget-item-name">
              <a href='#' onClick={this.toggleExpenses} className={'show-expenses'}><i draggable onDragStart={this.drag} className={toggleClasses}></i></a>
              <InputField onChange={this.update.bind(this, item)} required={true} type='text' name='name' placeholder='Name' value={item.name} errors={item.errors} />
            </div>
            <div className="large-1 medium-1 columns text-right budget-item-amount-spent">
              {numberToCurrency(this.props.amountSpent)}
            </div>
            <div className="large-2 medium-2 columns text-right budget-item-amount-budgeted">
              <InputField onChange={this.update.bind(this, item)} required={true} type='number' name='amount_budgeted' step='any' min='0.01' required placeholder='0.00' defaultValue={numberToCurrency(this.amount_budgeted, '')} value={item.amount_budgeted} errors={item.errors} />
            </div>
            <div className="large-1 medium-1 columns text-right">
              <span className={this.remainingClass(this.props.amountRemaining)}>{numberToCurrency(this.props.amountRemaining)}</span>
            </div>
            <div className='large-4 medium-4 columns'>
              <button type='submit' title='Save Budget Item' className='tiny success radius button'><i className='fi-icon fi-check'></i> Save</button>
              &nbsp;
              <a href='#' onClick={deleteFunction} title='Delete Budget Item' className='tiny alert radius button'><i className='fi-icon fi-trash'></i> Delete</a>
            </div>
          </form>
        </div>
        {this.getExpensesList(item.id, this.state.hideExpenses)}
        <ul data-dropdown-content className="f-dropdown"></ul>
        <Confirm name={item.name}
                 hidden={this.state.deleteModalHidden}
                 cancel={this.onDeleteCancel}
                 delete={this.deleteBudgetItem} />
      </div>
    );
  }
}
