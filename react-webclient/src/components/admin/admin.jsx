import React from 'react';
import classNames from 'classnames';
import {users} from '../../data/admin';
import {title} from '../../utils/helpers';

import {
  Col,
  Row,
  Table,
} from 'antd';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    title('Admin');
    this.fetchUsers();
  }

  fetchUsers() {
    users()
      .then((resp) => {
        if (resp.error === undefined) {
          this.usersFetched(resp)
        } else {
          showMessage(resp.error);
          this.context.history.replace('/');
        }
      })
  }

  usersFetched = (users) => {
    this.setState({users});
  }

  signInDate(date) {
    if (date !== null) {
      return (new Date(date)).toLocaleString();
    } else {
      return '--:--';
    }
  }

  columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Last Sign In',
    dataIndex: 'last_sign_in',
    key: 'last_sign_in',
  }, {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  }, {
    title: '#',
    dataIndex: 'sign_in_count',
    key: 'sign_in_count',
  }];

  dataSource(users) {
    return users.map((user,key) => {
      return {
        key: `user-key-${key}`,
        name: <span>{user.first_name}, <b>{user.last_name}</b></span>,
        email: user.email,
        last_sign_in: this.signInDate(user.current_sign_in_at),
        ip: user.current_sign_in_ip,
        sign_in_count: user.sign_in_count,
      }
    })
  }

  render() {
    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <div className='header-row'>
            <h3>Admin Panel</h3>
          </div>
          <div className="body-row">
            <Table dataSource={this.dataSource(this.state.users)}
                   pagination={false}
                   bordered
                   locale={{emptyText: "There are no users yet :("}}
                   columns={this.columns} />
          </div>
        </Col>
      </Row>
    );
  }
}
