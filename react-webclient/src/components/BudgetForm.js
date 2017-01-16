import React from 'react';
import classNames from 'classnames';
import InputField from './forms/input_field';
import {numberToCurrency} from '../utils/helpers';
import {keys} from 'lodash';
import {updateBudget} from '../data/Budget';

import { Form, Modal, Button, InputNumber } from 'antd';
const FormItem = Form.Item;

class IncomeInput extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {};
    this.state = {
      monthly_income: value.monthly_income || 0,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handleNumberChange = (number) => {
    const monthly_income = parseFloat(number).toFixed(2) || 0;
    if (isNaN(monthly_income)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ monthly_income });
    }
    this.triggerChange({ monthly_income });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    return (
      <InputNumber
        size="large"
        min={0.00}
        value={this.state.monthly_income}
        onChange={this.handleNumberChange}
      />
    );
  }
}

class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false
    }
  }

  updateBudget = (updatedIncome) => {
    const updatedBudget = Object.assign({}, this.props.budget, updatedIncome)
    this.props.updateBudget({budget: updatedBudget});
  }

  persistBudget = async (budget) => {
    try {
      this.setState({confirmLoading: true})
      const resp = await updateBudget(budget);
      if (!!resp.errors) {
        const budgetWithErrors = Object.assign({}, budget, {errors: resp.errors});
        this.props.updateBudget({budget: budgetWithErrors})
      } else {
        const updatedBudget = Object.assign({}, budget, resp);
        this.props.updateBudget({budget: resp})
        this.props.onCancel();
        showMessage('Updated Budget');
      }
    } catch(err) {
      apiError(err.message);
    } finally {
      this.setState({confirmLoading: false})
    }
  }

  saveBudget(budget) {
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

  checkPrice(rule, value, callback) {
    if (value.monthly_income > 0) {
      callback();
      return;
    }
    callback('Income must greater than zero!');
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveBudget(this.props.budget);
      }
    });
  }

  render() {
    const messageClass = classNames({
      'alert-color': this.props.notBudgeted < 0,
      'blue-color': this.props.notBudgeted == 0
    })
    const budget = this.props.budget
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title="Update Monthly Income"
             visible={this.props.visible}
             onOk={this.handleSubmit}
             confirmLoading={this.state.confirmLoading}
             okText="Update Monthly Income"
             cancelText="Cancel"
             onCancel={this.props.onCancel}>

        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="Monthly Income">
            {getFieldDecorator('monthly_income', {
              initialValue: { monthly_income: this.props.budget.monthly_income },
              rules: [{ validator: this.checkPrice }],
            })(<IncomeInput onChange={this.updateBudget} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(BudgetForm)
