import React, {Component} from 'react';
import {resetPassword} from '../../data/user';
import InputField from '../forms/input_field';
import {ensureWindowHeight} from '../../utils/helpers';
import {browserHistory} from 'react-router';

import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
} from 'antd';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ensureWindowHeight();
  }

  resetPassword = async(user) => {
    try {
      const resp = await resetPassword({user,
        password_reset_token: this.props.location.query.reset_password_token
      });

      if (resp && resp.success) {
        showMessage("Your password has been updated");
        browserHistory.replace('/');
      } else {
        showError("The link in your email may have expired.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.resetPassword(user);
      } else {
        showError("Please check form for errors")
      }
    });
  }

  checkPasswordConfirmation = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  }

  formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row className="space-around">
        <Col span={8} offset={8}>
          <div className='header-row'>
            <h3>Change your password</h3>
          </div>
          <div className="body-row clearfix">
            <Form horizontal onSubmit={this.handleSubmit}>
              <Col span={24}>
                <Form.Item {...this.formItemLayout} label="New Password" hasFeedback>
                  {getFieldDecorator('password', {
                    onChange: this.update,
                    rules: [{
                      required: true, message: "You need to provide a new password"
                    }],
                  })(
                    <Input addonBefore={<Icon type="lock"/>} type="password" />
                  )}
                </Form.Item>
                <Form.Item {...this.formItemLayout} label="Password Confirmation" hasFeedback>
                  {getFieldDecorator('password_confirmation', {
                    onChange: this.update,
                    rules: [{
                        required: true, message: "Password Confirmation is required"
                      }, {
                        validator: this.checkPasswordConfirmation
                      }],
                  })(
                    <Input addonBefore={<Icon type="lock"/>} type="password" />
                  )}
                </Form.Item>
                <Col span={12} offset={12}>
                  <Button type="primary" htmlType="submit" className="right" size="large">Change Password</Button>
                </Col>
              </Col>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Form.create()(PasswordReset);
