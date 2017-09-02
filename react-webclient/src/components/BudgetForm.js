import React from 'react';
import classNames from 'classnames';
import InputField from './forms/input_field';
import { numberToCurrency } from '../utils/helpers';
import { keys } from 'lodash';
import { updateBudget } from '../data/Budget';

import { Form, Modal, Button, InputNumber } from 'antd';
const FormItem = Form.Item;

class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
    };
  }

  updateFromEvent = e => {
    this.updateBudget(e.target.value);
  };

  updateBudget = updatedIncome => {
    const budget = Object.assign({}, this.props.budget, {
      monthly_income: String(updatedIncome),
    });
    this.props.updateBudget({ budget });
  };

  persistBudget = async budget => {
    try {
      this.setState({ confirmLoading: true });
      const resp = await updateBudget(budget);
      if (!!resp.errors) {
        const budgetWithErrors = Object.assign({}, budget, {
          errors: resp.errors,
        });
        this.props.updateBudget({ budget: budgetWithErrors });
      } else {
        const updatedBudget = Object.assign({}, budget, resp);
        this.props.updateBudget({ budget: resp });
        this.props.onCancel();
        showMessage('Updated Budget');
      }
    } catch (err) {
      apiError(err.message);
    } finally {
      this.setState({ confirmLoading: false });
    }
  };

  saveBudget(budget) {
    this.persistBudget(budget);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveBudget(this.props.budget);
      }
    });
  };

  render() {
    const messageClass = classNames({
      'alert-color': this.props.notBudgeted < 0,
      'blue-color': this.props.notBudgeted == 0,
    });
    const budget = this.props.budget;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Update Monthly Income"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        confirmLoading={this.state.confirmLoading}
        okText="Update Monthly Income"
        cancelText="Cancel"
        onCancel={this.props.onCancel}
      >
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          onChange={this.updateFromEvent}
        >
          <FormItem label="Monthly Income">
            {getFieldDecorator('monthly_income', {
              initialValue: parseInt(budget.monthly_income, 10),
              rules: [
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  message: 'Monthly Income is required',
                },
              ],
            })(
              <InputNumber
                size="large"
                name="monthly_income"
                step={100}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.updateBudget}
                min={1}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(BudgetForm);
