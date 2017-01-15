import React from 'react';
import {
  Button,
  DatePicker,
  Icon,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
} from 'antd';
import moment from 'moment';

class NewAnnualBudgetItem extends React.Component {
  layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, annual_budget_item) => {
      if (!err) {
        this.props.handleOnSubmit(annual_budget_item);
        this.props.form.resetFields();
      }
    })
  }

  amountChanged = (amount=0) => {
    let component = this.props.form.getFieldInstance('amount');
    const originalAmount = ReactDOM.findDOMNode(component).querySelector('input').value
    return this.addDecimal(originalAmount, amount);
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

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Item {...this.layout} label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: "Name is required" }],
          })(
            <Input placeholder="Life Insurance" />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Amount">
          {getFieldDecorator('amount', {
            initialValue: 10.00,
            getValueFromEvent: this.amountChanged,
          })(
            <InputNumber min={0.01} placeholder="(10.00)" />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Due Date">
          {getFieldDecorator('due_date', {
            initialValue: moment(),
          })(
            <DatePicker onChange={this.handleOnChange}
                        size="large"
                        allowClear={false}
                        format={'YYYY-MM-DD'} />
          )}
        </Form.Item>
        <Row type="flex" justify="end">
          <Form.Item {...this.layout}>
            {getFieldDecorator('paid',{initialValue: false})(
              <Switch checkedChildren="paid" unCheckedChildren="paid" />
            )}
          </Form.Item>
        </Row>
        <Row type="flex" justify="end">
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            Save Item
          </Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(NewAnnualBudgetItem);
