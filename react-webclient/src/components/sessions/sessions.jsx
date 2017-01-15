import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import PasswordResetRequest from './PasswordResetRequest';
import {Tabs, Button} from 'antd';

export default class Sessions extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Sign In' key='1'>
          <SignIn />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sign Up' key='2'>
          <SignUp />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Forgot Password?' key='3'>
          <PasswordResetRequest />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
