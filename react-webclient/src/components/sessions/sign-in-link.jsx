import React from 'react';
import Sessions from './sessions';
import classNames from 'classnames';
import {Modal, Button} from 'antd';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  handleClick = () => {
    this.setState({visible: true});
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  render() {
    return (
      <div>
        <a onClick={this.handleClick} href='#' title='Sign In or Sign Up'>Sign in / Sign up</a>
        <Modal title='Sign In or Join' width={320} visible={this.state.visible} onCancel={this.handleCancel} cancelText='Cancel' okText='ok' wrapClassName='no-modal-footer'>
          <Sessions />
        </Modal>
      </div>
    );
  }
}
