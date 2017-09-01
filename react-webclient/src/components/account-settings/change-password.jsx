import React from 'react';
import { changePassword } from '../../data/user';
import InputField from '../forms/input_field';
import { prettyServerErrors } from '../../utils/helpers';

import { Button, Col, Form, Icon, Input, Row } from 'antd';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_confirmation: '',
      current_password: '',
    };
  }

  update = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  savePassword = async data => {
    try {
      const resp = await changePassword(data);
      if (resp.errors) {
        showError(prettyServerErrors(resp.errors));
      } else {
        showMessage(resp.message);
      }
    } catch (err) {
      apiError(err);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = {
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        };
        const data = { user, current_password: this.state.current_password };
        this.savePassword(data);
        this.props.form.resetFields();
      } else {
        showError('Please check form for errors');
      }
    });
  };

  formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };

  checkPasswordConfirmation = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <div className="header-row">
          <h3>Change Password</h3>
        </div>
        <div className="body-row account-settings clearfix">
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Col span={24}>
              <Form.Item
                {...this.formItemLayout}
                label="New Password"
                hasFeedback
              >
                {getFieldDecorator('password', {
                  onChange: this.update,
                  rules: [
                    {
                      required: true,
                      message: 'Password is required',
                    },
                  ],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" />
                )}
              </Form.Item>
              <Form.Item
                {...this.formItemLayout}
                label="Password Confirmation"
                hasFeedback
              >
                {getFieldDecorator('password_confirmation', {
                  onChange: this.update,
                  rules: [
                    {
                      required: true,
                      message: 'Password Confirmation is required',
                    },
                    {
                      validator: this.checkPasswordConfirmation,
                    },
                  ],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" />
                )}
              </Form.Item>
              <Form.Item
                {...this.formItemLayout}
                label="Current Password"
                hasFeedback
              >
                {getFieldDecorator('current_password', {
                  onChange: this.update,
                  rules: [
                    {
                      required: true,
                      message: 'Current Password is required',
                    },
                  ],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" />
                )}
              </Form.Item>
              <Col span={12} offset={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="right"
                  size="large"
                >
                  Change Password
                </Button>
              </Col>
            </Col>
          </Form>
        </div>
      </Row>
    );
  }
}

export default Form.create()(ChangePassword);
