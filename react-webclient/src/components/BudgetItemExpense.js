import React from 'react';
import InputField from './forms/input_field';
import PredictedExpenses from './forms/predicted_expenses';
import { numberToCurrency, prettyServerErrors } from '../utils/helpers';
import {
  createExpense,
  updateExpense,
  destroyExpense,
  predictionsExpense,
} from '../data/BudgetItemExpense';
import { difference } from 'lodash';
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
  Popconfirm,
} from 'antd';

let typedChange = true;

class ExpenseDateCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnChange = (momentDate, date) => {
    const updatedExpense = Object.assign({}, this.props.expense, { date });
    this.props.updateBudgetItemExpense(updatedExpense);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateStatus =
      /^\d{4,}-[0-1]?[0-9]-[0-3]?[0-9]$/.test(this.props.expense.date) > 0
        ? ''
        : 'error';
    return (
      <Form layout="inline">
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('date', {
            initialValue: this.props.expense.date,
          })(
            <div>
              <Col span={24}>
                <DatePicker
                  onChange={this.handleOnChange}
                  size="large"
                  allowClear={false}
                  defaultValue={moment(this.props.expense.date, 'YYYY-MM-DD')}
                  format={'YYYY-MM-DD'}
                />
              </Col>
            </div>
          )}
        </Form.Item>
      </Form>
    );
  }
}

class ExpenseAmountCell extends React.Component {
  constructor(props) {
    super(props);
  }

  updateFromEvent = e => {
    this.updateAmount(e.target.value);
  };

  updateAmount = amount => {
    const updatedExpense = Object.assign({}, this.props.expense, {
      amount: String(amount).replace(/\$\s?|(,*)/g, ''),
    });
    this.props.updateBudgetItemExpense(updatedExpense);
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const callback =
      this.props.expense.id > 0
        ? this.props.updateBudgetItemExpense
        : this.props.saveBudgetItemExpense;
    persistExpense(this.props.expense, callback, this.props.toggleLoading);
  };

  render() {
    const { setFieldsValue, getFieldDecorator } = this.props.form;
    const validateStatus = this.props.expense.amount > 0 ? '' : 'error';
    return (
      <Form
        layout="inline"
        onSubmit={this.handleOnSubmit}
        onChange={this.updateFromEvent}
      >
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('amount', {
            initialValue: this.props.expense.amount,
            rules: [
              {
                required: true,
                type: 'number',
                min: 1,
                message: 'Amount is required',
              },
            ],
          })(
            <InputNumber
              onChange={this.updateAmount}
              name="expense_amount"
              min={1}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="(10.00)"
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

class ExpenseNameCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
    };
  }

  predict = async word => {
    try {
      const resp = await predictionsExpense(word);
      if (resp !== null) {
        const predictions = difference(resp, [word]);
        this.setState({ predictions });
      }
    } catch (err) {
      apiError(err.message);
    }
  };

  handleChange = (name = '') => {
    const updatedExpense = Object.assign({}, this.props.expense, { name });
    this.props.updateBudgetItemExpense(updatedExpense);

    if (name.length > 1) {
      this.predict(name);
    } else {
      this.setState({ predictions: [] });
    }
  };

  handleSelect = name => {
    this.setState({ predictions: [] });
  };

  filterOption(inputValue, option) {
    return (
      option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !==
      -1
    );
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const callback =
      this.props.expense.id > 0
        ? this.props.updateBudgetItemExpense
        : this.props.saveBudgetItemExpense;
    persistExpense(this.props.expense, callback, this.props.toggleLoading);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateStatus = this.props.expense.name.length > 0 ? '' : 'error';
    return (
      <Form layout="inline" onSubmit={this.handleOnSubmit}>
        <Form.Item validateStatus={validateStatus}>
          {getFieldDecorator('name', {
            initialValue: this.props.expense.name,
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
    );
  }
}

const persistStrategy = expense => {
  return expense.id > 0 ? updateExpense(expense) : createExpense(expense);
};
const validExpense = expense => {
  return (
    expense.amount > 0 && expense.name.length > 0 && expense.date.length > 0
  );
};
const persistExpense = async (expense, callback, toggleLoading) => {
  try {
    toggleLoading();
    if (!validExpense(expense)) {
      return;
    }

    const resp = await persistStrategy(expense);
    if (!!resp.errors) {
      showMessage(prettyServerErrors(resp.errors), 'error');
    } else {
      showMessage(`Saved ${resp.name}`);
      callback(resp);
    }
  } catch (err) {
    apiError(err.message);
  } finally {
    toggleLoading();
  }
};

class ExpenseActionCell extends React.Component {
  constructor(props) {
    super(props);
    this.isPersisted = props.expense.id > 0;
    this.title = `Are you sure you want to delete this expense?`;
    this.okText = `Delete`;
    this.persistStrategy = this.isPersisted ? updateExpense : createExpense;
    this.action = this.isPersisted
      ? this.props.updateBudgetItemExpense
      : this.props.saveBudgetItemExpense;
  }

  deleteExpense = async () => {
    try {
      const resp = await destroyExpense(this.props.expense.id);
      if (resp !== null) {
        showMessage('Deleted ' + this.props.expense.name);
      }
    } catch (err) {
      apiError(err.message);
    }
  };

  handleOnClick = () => {
    const callback =
      this.props.expense.id > 0
        ? this.props.updateBudgetItemExpense
        : this.props.saveBudgetItemExpense;
    persistExpense(this.props.expense, callback, this.props.toggleLoading);
  };

  handleOnConfirm = () => {
    if (this.isPersisted) {
      this.deleteExpense();
    }
    this.props.deleteBudgetItemExpense(this.props.expense);
  };

  render() {
    const { loading } = this.props;
    const icon = loading ? 'loading' : 'check';
    return (
      <div className="item-actions text-center">
        <Button
          onClick={this.handleOnClick}
          icon={icon}
          disabled={loading}
          shape="circle"
          type="primary"
          title="Save Expense"
        />
        <Popconfirm
          arrowPointAtCenter={true}
          title={this.title}
          overlayClassName="delete-popover"
          placement="left"
          onConfirm={this.handleOnConfirm}
          okText={this.okText}
        >
          <Button
            className="delete-button"
            shape="circle"
            icon="delete"
            title="Delete Expense"
          />
        </Popconfirm>
      </div>
    );
  }
}

let Expense = {};

Expense.DateCell = Form.create()(ExpenseDateCell);
Expense.AmountCell = Form.create()(ExpenseAmountCell);
Expense.NameCell = Form.create()(ExpenseNameCell);
Expense.ActionCell = ExpenseActionCell;

module.exports = Expense;
