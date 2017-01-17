import React from 'react';
import {signIn} from '../../data/sessions';
import {browserHistory} from 'react-router';
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Switch
} from 'antd';
const FormItem = Form.Item;

const SignIn = Form.create()(React.createClass({
  async performSignIn(user) {
    try {
      const resp = await signIn(user);
      if (resp.success) {
        localStorage.setItem('session', JSON.stringify(resp.session));
        localStorage.setItem('user', JSON.stringify(resp.user));
        showMessage('You are now signed in');
        browserHistory.replace('/');
      } else {
        showError(resp.message)
      }
    } catch(err) {
      showError("We had trouble signing you in, please try again later");
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.performSignIn({user})
      }
    })
  },

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
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <Row type="flex" justify="end">
          <Col span={12}>
            <FormItem label="Remember Me">
                  {getFieldDecorator('remember_me', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Switch />
                  )}
            </FormItem>
          </Col>
          <Col span={8} offset={4}>
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
              Sign In
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}))

export default SignIn;
