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

class AnnualBudgetItemForm extends React.Component {
  layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, annual_budget_item) => {
      if (!err) {
        this.props.handleOnSubmit(Object.assign({}, this.props.budgetItem, annual_budget_item));
        setTimeout(this.props.form.resetFields, 500);
      }
    })
  }

  amountChanged = (newAmount) => {
    const component = this.props.form.getFieldInstance('amount');
    const original  = parseFloat(ReactDOM.findDOMNode(component).querySelector('input').value);
    let amount_budgeted = original;
    const diff = (original - newAmount).toFixed(2)

    if (diff !== "0.00") {
      if (newAmount < original) {
        amount_budgeted -= 1.00
      } else {
        amount_budgeted += 1.00
      }
    }

    return String(amount_budgeted);
  }

  render() {
    const item = this.props.budgetItem;
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Item {...this.layout} label="Name">
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: "Name is required" }],
          })(
            <Input placeholder="Life Insurance" />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Amount">
          {getFieldDecorator('amount', {
            initialValue: item.amount,
            getValueFromEvent: this.amountChanged,
          })(
            <InputNumber  min={0.01} placeholder="(10.00)" />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Due Date">
          {getFieldDecorator('due_date', {
            initialValue: moment(item.due_date),
          })(
            <DatePicker onChange={this.handleOnChange}
                        size="large"
                        allowClear={false}
                        format={'YYYY-MM-DD'} />
          )}
        </Form.Item>
        <Row type="flex" justify="end">
          <Form.Item {...this.layout}>
            {getFieldDecorator('paid', {
              initialValue: item.paid,
              valuePropName: 'checked'
            })(
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

export default Form.create()(AnnualBudgetItemForm);
