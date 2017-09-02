import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from 'antd';
import moment from 'moment';

class AnnualBudgetItemForm extends React.Component {
  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, annual_budget_item) => {
      if (!err) {
        this.props.handleOnSubmit(
          Object.assign({}, this.props.budgetItem, annual_budget_item)
        );
        setTimeout(this.props.form.resetFields, 500);
      }
    });
  };

  render() {
    const item = this.props.budgetItem;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Item {...this.layout} label="Name">
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: 'Name is required' }],
          })(<Input placeholder="Life Insurance" />)}
        </Form.Item>
        <Form.Item {...this.layout} label="Amount">
          {getFieldDecorator('amount', {
            initialValue: parseInt(item.amount, 10),
          })(
            <InputNumber
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              name="amount"
              min={1}
              placeholder="(10.00)"
            />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Due Date">
          {getFieldDecorator('due_date', {
            initialValue: moment(item.due_date),
          })(
            <DatePicker
              onChange={this.handleOnChange}
              size="large"
              allowClear={false}
              format={'YYYY-MM-DD'}
            />
          )}
        </Form.Item>
        <Form.Item {...this.layout} label="Months">
          {getFieldDecorator('payment_intervals', {
            initialValue: item.payment_intervals,
          })(
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="6">6</Select.Option>
              <Select.Option value="7">7</Select.Option>
              <Select.Option value="8">8</Select.Option>
              <Select.Option value="9">9</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="11">11</Select.Option>
              <Select.Option value="12">12</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Row type="flex" justify="end">
          <Form.Item {...this.layout}>
            {getFieldDecorator('paid', {
              initialValue: item.paid,
              valuePropName: 'checked',
            })(<Switch checkedChildren="paid" unCheckedChildren="paid" />)}
          </Form.Item>
        </Row>
        <Row type="flex" justify="end">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Save Item
          </Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(AnnualBudgetItemForm);
