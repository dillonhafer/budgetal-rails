import React from 'react';
import classNames from 'classnames';
import InputField from '../forms/input_field';
import {numberToCurrency} from '../../utils/helpers';

export default class AnnualBudgetItemForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired,
    updateForm: React.PropTypes.func.isRequired,
    saveForm: React.PropTypes.func.isRequired,
    deleteForm: React.PropTypes.func.isRequired
  }

  updateForm = (e) => {
    var newValue = (e.target.name === 'paid') ? e.target.checked : e.target.value;
    this.props.budgetItem[e.target.name] = newValue;
    this.props.updateForm(this.props.index, this.props.budgetItem);
  }

  saveForm = (e) => {
    e.preventDefault();
    this.props.saveForm({
      annual_budget_item: this.props.budgetItem,
      index: this.props.index
    });
  }

  deleteForm = (e) => {
    e.preventDefault();
    this.props.deleteForm(this.props.budgetItem, this.props.index);
  }

  render() {
    let item = this.props.budgetItem;
    return (
      <form onSubmit={this.saveForm} data-abide>
        <div className='row'>
          <div className='large-4 columns'>
            <InputField type='text' name='name' onChange={this.updateForm} value={item.name} placeholder='Name' errors={item.errors} />
          </div>
          <div className='large-2 columns'>
            <InputField type="number" name='amount' onChange={this.updateForm} value={numberToCurrency(item.amount, '')} step='any' min='0.00' placeholder='0.00' errors={item.errors} />
          </div>
          <div className='large-2 columns'>
            <InputField type='text' name='due_date' readOnly onChange={this.updateForm} placeholder='2015-07-01' value={item.due_date} className='get-date' errors={item.errors} />
          </div>
          <div className='large-1 columns text-center'>
            <input type='checkbox' name='paid' onChange={this.updateForm} defaultChecked={item.paid} />
          </div>
          <div className='large-3 columns'>
            <button type='submit' title='Save Item' className='tiny success radius button'><i className='fi-icon fi-check'></i> Save</button>
            &nbsp;
            <a href='#' onClick={this.deleteForm} title='Delete Item' className='tiny alert radius button'><i className='fi-icon fi-trash'></i> Delete</a>
          </div>
        </div>
      </form>
    );
  }
}
