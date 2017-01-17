import React from 'react';
import moment from 'moment';
import {
  numberStep
} from '../../utils/helpers';
import {merge} from 'lodash';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
} from 'antd';
const {RangePicker} = DatePicker;

class AllocationPlanForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    plan: React.PropTypes.object,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired
  }

  handleOnRangeChange = (moments,dates) => {
    const plan = merge({}, this.props.plan, {start_date: dates[0], end_date: dates[1]});
    this.props.update(plan);
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save();
      }
    });
  }

  amountChanged = (newIncome) => {
    const component = this.props.form.getFieldInstance('income');
    const income    = numberStep(newIncome, component)
    const plan = merge({}, this.props.plan, {income});
    this.props.update(plan);
    return income;
  }

  render() {
    const {plan} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 10 },
    };

    const tailItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 18,
      }
    };
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Item label="Start and End Date">
          {getFieldDecorator('dates', {
            initialValue: [moment(plan.start_date), moment(plan.end_date)],
            rules: [{required: true}]
          })(
            <RangePicker onChange={this.handleOnRangeChange} />
          )}
        </Form.Item>
        <Form.Item label="Income"  {...formItemLayout}>
          {getFieldDecorator('income', {
            initialValue: plan.income,
            getValueFromEvent: this.amountChanged,
            rules: [{required: true, message: 'Income is required'}]
          })(
            <InputNumber onChange={this.handleOnChange} min={0.01} placeholder="(10.00)" />
          )}
        </Form.Item>
        <Form.Item {...tailItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Save</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AllocationPlanForm)
