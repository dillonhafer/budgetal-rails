import React, {Component} from 'react';
import classNames from 'classnames';
import {resetPasswordRequest} from '../../data/user';
import { browserHistory } from 'react-router';

import {
  Button,
  Icon,
  Col,
  Form,
  Input,
  Row,
} from 'antd';

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props);
  }

  resetPassword = async(email) => {
    try {
      const resp = await resetPasswordRequest(email);
      if (resp !== null) {
        showMessage("We just sent you an email with instructions on how to reset your password");
        browserHistory.replace('/');
      }
    } catch(err) {
      apiError(err);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, email) => {
      if (!err) {
        this.resetPassword(email)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ type: 'email', required: true, message: "Email is not a valid format" }],
          })(
            <Input addonBefore={<Icon type="mail" />} placeholder="email@example.com" />
          )}
        </Form.Item>
        <Row type="flex" justify="end">
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            Request Password Reset
          </Button>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(PasswordResetRequest);
