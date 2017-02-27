import React from 'react';
import classNames from 'classnames';
import InputField from './forms/input_field';
import BudgetItemExpenseListContainer from '../containers/BudgetItemExpenseListContainer';
import {createItem, updateItem, destroyItem} from '../data/BudgetItem';
import {addDecimal, numberToCurrency, prettyServerErrors} from '../utils/helpers';
import Confirm from '../utils/confirm';
import {startCase} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Row,
  Switch,
} from 'antd';
const FormItem = Form.Item;

class BudgetItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideExpenses: false
    }
  }

  static propTypes = {
    budgetItem: React.PropTypes.object.isRequired,
  }

  update = (e,a) => {
    const updatedItem = Object.assign({}, this.props.budgetItem, {[e.target.id]: e.target.value})
    this.props.updateBudgetItem(updatedItem)
  }

  persistBudgetItem = async(budgetItem) => {
    try {
      const isPersisted = budgetItem.id > 0;
      const strategy = isPersisted ? updateItem : createItem;
      const afterSaveStrategy = isPersisted ? this.props.updateBudgetItem : this.props.saveBudgetItem;
      const resp = await strategy(budgetItem);

      if (!!resp.errors) {
        showMessage(prettyServerErrors(resp.errors), "error")
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
    const component = this.props.form.getFieldInstance('amount_budgeted');
    const original  = parseFloat(ReactDOM.findDOMNode(component).querySelector('input').value);
    const amount_budgeted = this.amountChanged(original);
    const item = Object.assign({}, this.props.budgetItem, {amount_budgeted});
    this.persistBudgetItem(item);
  }

  deleteBudgetItem = async() => {
    try {
      if (this.props.budgetItem.id !== undefined) {
        const resp = destroyItem(this.props.budgetItem.id);
        if (resp !== null) {
          showMessage("Deleted "+this.props.budgetItem.name);
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

  getExpensesList(budgetItem, hideExpenses) {
    if (budgetItem.id > 0) {
      const items = hideExpenses ? <BudgetItemExpenseListContainer key="budget-expenses-list" budgetItem={budgetItem} budgetItemId={budgetItem.id} /> : null
      return (
        <ReactCSSTransitionGroup
          transitionName="expense-list"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {items}
        </ReactCSSTransitionGroup>
      )
    }
  }

  onDeleteClick = (e) => {
    e.preventDefault()
    this.props.deleteBudgetItem(this.props.budgetItem);
  }

  handleDeleteClick = (e) => {
    e.preventDefault()
    Modal.confirm({
      wrapClassName: 'delete-button',
      okText: `Delete ${this.props.budgetItem.name}`,
      cancelText: "Cancel",
      title: `Delete ${this.props.budgetItem.name}`,
      content: `Are you sure you want to delete ${this.props.budgetItem.name}? This cannot be undone.`,
      onOk: () => {this.deleteBudgetItem(this.props.budgetItem)},
      onCancel() {},
    });
  }

  percentSpent = () => {
    const p = this.props.amountSpent / this.props.budgetItem.amount_budgeted * 100;
    return p > 99.99 ? 100 : parseInt(p);
  }

  handleOnChange = (hideExpenses) => {
    this.setState({hideExpenses});
  }

  amountChanged = (newAmount) => {
    const component = this.props.form.getFieldInstance('amount_budgeted');
    const original  = parseFloat(ReactDOM.findDOMNode(component).querySelector('input').value);
    let amount_budgeted = original;
    const diff = (original - newAmount).toFixed(2)

    if (diff !== 0.00.toFixed(2)) {
      if (newAmount < original) {
        amount_budgeted -= 1.00
      } else {
        amount_budgeted += 1.00
      }
    }

    this.props.updateBudgetItem(Object.assign({}, this.props.budgetItem, {amount_budgeted}))
    return String(amount_budgeted);
  }

  render() {
    const item = this.props.budgetItem;
    const deleteFunction = item.id > 0 ? this.handleDeleteClick : this.props.deleteBudgetItem.bind(this,item);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    let status;
    if (this.props.amountRemaining < 0) {
      status = 'exception';
    } else if (this.props.amountRemaining === 0.00) {
      status = 'success'
    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <Form horizontal onSubmit={this.save}>
              <FormItem
                {...formItemLayout}
                label="Name"
              >
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [{
                    required: true, message: 'Name is required',
                  }],
                })(
                  <Input onChange={this.update} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Amount"
              >
                {getFieldDecorator('amount_budgeted', {
                  initialValue: item.amount_budgeted,
                  getValueFromEvent: this.amountChanged,
                  rules: [{
                    required: true, message: 'Amount Budgeted is required',
                  }],
                })(
                  <InputNumber name="amount_budgeted" min={0.01} step="1.00" />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout} className='text-right'>
                <Button type="primary" htmlType="submit">Save</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={18}>
            <Row type="flex" justify="center">
              <Col span={8}>
                <div className='text-right'>
                  <Progress type="circle" status={status} percent={this.percentSpent()} />
                </div>
              </Col>
              <Col span={12}>
                <p className='text-center'>
                  You have spent <b>{numberToCurrency(this.props.amountSpent)}</b> of <b>{numberToCurrency(item.amount_budgeted)}</b>.
                </p>
                <p className='text-center'>
                  You have <b>{numberToCurrency(this.props.amountRemaining)}</b> remaining to spend.
                </p>
              </Col>
              <Col span={4} style={{alignSelf: 'flex-start'}}>
                <Button onClick={deleteFunction}
                        type="primary"
                        className="delete-button right"
                        shape="circle"
                        icon="delete" />
              </Col>
            </Row>
          </Col>
          <div className='right text-center'>
            Toggle Expenses
            <br />
            <Switch disabled={item.id === undefined} checked={this.state.hideExpenses} onChange={this.handleOnChange} checkedChildren='show' unCheckedChildren='hide' />
            <br />
            <br />
          </div>
          <hr />
        </Row>
        {this.getExpensesList(item, this.state.hideExpenses)}
      </div>
    );
  }
}

export default Form.create()(BudgetItem)
