import React from 'react';
import { browserHistory } from 'react-router';
import {signUp} from '../../data/sessions';
import {prettyServerErrors} from '../../utils/helpers';
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
} from 'antd';
const FormItem = Form.Item;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  signUp = async(user) => {
    try {
      const resp = await signUp(user);
      if (!!resp.errors) {
        showError(prettyServerErrors(resp.errors));
      } else {
        localStorage.setItem('session', JSON.stringify(resp.session));
        localStorage.setItem('user', JSON.stringify(resp.user));
        showMessage('Welcome to Budgetal!');
        browserHistory.replace('/');
      }
    } catch(err) {
      apiError(err);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.signUp({user})
      }
    })
  }

  checkPasswordConfirmation = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ type: 'email', required: true, message: "Email is not a valid format" }],
          })(
            <Input addonBefore={<Icon type="mail" />} placeholder="email@example.com" />
          )}
        </FormItem>
        <Row>
          <Col span={11}>
            <FormItem>
              {getFieldDecorator('first_name', {
                rules: [{ required: true, message: "First Name is required" }],
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="First Name" />
              )}
            </FormItem>
          </Col>
          <Col span={11} offset={2}>
            <FormItem>
              {getFieldDecorator('last_name', {
                rules: [{ required: true, message: "Last Name is required" }],
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="Last Name" />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password_confirmation', {
            rules: [{
              required: true, message: "Password Confirmation is required"
            }, {
              validator: this.checkPasswordConfirmation
            }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password Confirmation" />
          )}
        </FormItem>
        <Row type="flex" justify="end">
          <Col span={8} offset={4}>
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SignUp);
