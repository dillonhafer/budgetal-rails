import React from 'react';
import InputField from './forms/input_field';
import PredictedExpenses from './forms/predicted_expenses';
import {numberToCurrency,prettyServerErrors} from '../utils/helpers';
import {createExpense, updateExpense, destroyExpense, predictionsExpense} from '../data/BudgetItemExpense';
import {debounce,difference} from 'lodash';
import Confirm from '../utils/confirm';

import moment from 'moment';
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm
} from 'antd';

let typedChange = true;

class ExpenseDateCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnChange = (momentDate, date) => {
    const updatedExpense = Object.assign({}, this.props.expense, {date})
    this.props.updateBudgetItemExpense(updatedExpense)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateStatus = /^\d{4,}-[0-1]?[0-9]-[0-3]?[0-9]$/.test(this.props.expense.date) > 0 ? "" : "error";
    return (
      <Form inline>
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('date', {
            initialValue: this.props.expense.date
          })(
            <div>
              <Col span={24}>
                <DatePicker onChange={this.handleOnChange}
                            size="large"
                            allowClear={false}
                            defaultValue={moment(this.props.expense.date, 'YYYY-MM-DD')}
                            format={'YYYY-MM-DD'} />
              </Col>
            </div>
          )}
        </Form.Item>
      </Form>
    )
  }
}

class ExpenseAmountCell extends React.Component {
  constructor(props) {
    super(props);
  }

  addDecimal(originalAmount, newAmount) {
    let wholeNumber = newAmount % 1 === 0;
    let amount = newAmount

    if (wholeNumber) {
      amount = newAmount + (originalAmount - Math.floor(originalAmount))
    }

    if (amount < 0) {
      amount = 0;
    }

    return amount.toFixed(2);
  }

  handleOnChange = (amount=0) => {
    let component = this.props.form.getFieldInstance('amount');
    const originalAmount = ReactDOM.findDOMNode(component).querySelector('input').value
    amount = this.addDecimal(originalAmount, amount);

    const updatedExpense = Object.assign({}, this.props.expense, {amount})
    this.props.updateBudgetItemExpense(updatedExpense)
  }

  amountChanged = (amount=0) => {
    let component = this.props.form.getFieldInstance('amount');
    const originalAmount = ReactDOM.findDOMNode(component).querySelector('input').value
    return this.addDecimal(originalAmount, amount);
  }

  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const validateStatus = this.props.expense.amount > 0 ? "" : "error";
    return (
      <Form inline>
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('amount', {
            initialValue: this.props.expense.amount,
            getValueFromEvent: this.amountChanged,
          })(
            <InputNumber onChange={this.handleOnChange} name="expense_amount" min={0.01} step="1.00" placeholder="(10.00)" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

class ExpenseNameCell extends React.Component {
  constructor(props) {
    super(props);
    this.predict = debounce(this._predict, 200)
    this.state = {
      predictions: [],
      didSelect: false
    }
  }

  _predict = async(word) => {
    try {
      if (this.state.didSelect) {
        this.setState({didSelect: false});
        return;
      }

      const resp = await predictionsExpense(word);
      if (resp !== null) {
        const predictions = difference(resp, [word]);
        this.setState({predictions})
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  handleChange = (name="") => {
    const updatedExpense = Object.assign({}, this.props.expense, {name})
    this.props.updateBudgetItemExpense(updatedExpense)

    if (name.length > 2) {
      this.predict(name);
    } else {
      this.setState({predictions: []})
    }
  }

  handleSelect = (name) => {
    this.setState({predictions: [], didSelect: true})
  }

  filterOption(inputValue, option) {
    return option.key.toLowerCase().startsWith(inputValue.toLowerCase());
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateStatus = this.props.expense.name.length > 0 ? "" : "error";
    return (
      <Form inline>
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('name', {
            initialValue: this.props.expense.name
          })(
            <AutoComplete
              allowClear={true}
              dataSource={this.state.predictions}
              style={{ width: 200 }}
              onSelect={this.handleSelect}
              onChange={this.handleChange}
              filterOption={this.filterOption}
              placeholder="(Rent Payment)"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

class ExpenseActionCell extends React.Component {
  constructor(props) {
    super(props);
    this.isPersisted = props.expense.id > 0;
    this.title  = `Are you sure you want to delete ${props.expense.name}?`;
    this.okText = `Delete ${props.expense.name}`;
    this.persistStrategy = this.isPersisted ? updateExpense : createExpense;
    this.action = this.isPersisted ? this.props.updateBudgetItemExpense : this.props.saveBudgetItemExpense;
  }

  deleteExpense = async() => {
    try {
      const resp = await destroyExpense(this.props.expense.id);
      if (resp !== null) {
        showMessage("Deleted "+this.props.expense.name);
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  validExpense(expense) {
    return (expense.amount > 0) && (expense.name.length > 0) && (expense.date.length > 0)
  }

  persistExpense = async(expense) => {
    try {
      if (!this.validExpense(expense)) {
        return
      }

      const resp = await this.persistStrategy(expense);
      if (!!resp.errors) {
        showMessage(prettyServerErrors(resp.errors), "error")
      } else {
        showMessage(`Saved ${resp.name}`)
        this.action(resp)
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  handleOnClick = () => {
    this.persistExpense(this.props.expense);
  }

  handleOnConfirm = () => {
    if (this.isPersisted) {
      this.deleteExpense()
    }
    this.props.deleteBudgetItemExpense(this.props.expense);
  }

  render() {
    return (
      <div className='item-actions text-center'>
        <Button onClick={this.handleOnClick} icon="check" shape="circle" type="primary" title="Save Expense"></Button>
        <Popconfirm arrowPointAtCenter={true}
          title={this.title}
          overlayClassName='delete-popover'
          placement="left"
          onConfirm={this.handleOnConfirm}
          okText={this.okText}
        >
          <Button className="delete-button" shape="circle" icon="delete" title="Delete Expense"></Button>
        </Popconfirm>
      </div>
    )
  }
}

class Expense extends React.Component {
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


  select = (word) => {
    const updatedExpense = Object.assign({}, this.props.expense, {name: word});
    this.props.updateBudgetItemExpense(updatedExpense);
    this.removePredictions();
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

Expense.DateCell   = Form.create()(ExpenseDateCell);
Expense.AmountCell = Form.create()(ExpenseAmountCell);
Expense.NameCell   = Form.create()(ExpenseNameCell);
Expense.ActionCell = ExpenseActionCell;

module.exports = Expense
