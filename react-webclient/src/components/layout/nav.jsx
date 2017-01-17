import React from 'react';
import { browserHistory, Link } from 'react-router';
import {signOut} from '../../data/sessions';
import {userAuthenticated} from '../../utils/helpers';
import logo from '../../assets/images/app_logo.png';
import SignInLink from '../sessions/sign-in-link';
import {Row, Col, Menu, Icon} from 'antd';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  signOut = (e) => {
    e.preventDefault();
    signOut().then((resp) => {
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      showMessage('You are now signed out');
      browserHistory.replace('/');
    });
  }

  adminLink(admin) {
    let items = [];
    if (admin) {
      items.push(
        <Menu.Item key="admin-link">
          <Link to='/admin'><Icon type='lock' />Admin Panel</Link>
        </Menu.Item>
      );
      items.push(<Menu.Divider key="divider3" />);
    }
    return items;
  }

  renderMenuItems() {
    const signedIn = userAuthenticated();
    if (signedIn) {
      const year  = (new Date).getFullYear();
      const month = (new Date).getMonth()+1;
      const user  = JSON.parse(localStorage['user'])
      return ([
        <Menu.Item key="budgets">
          <Link to={`/budgets/${year}/${month}`}> Budgets</Link>
        </Menu.Item>,
        <Menu.Item key="detailed-budgets">
          <Link to={`/detailed-budgets/${year}/${month}`}> Detailed Budgets</Link>
        </Menu.Item>,
        <Menu.Item key="annual-budgets">
          <Link to={`/annual-budgets/${year}`}> Annual Budgets</Link>
        </Menu.Item>,
        <Menu.SubMenu key='submenu' title={<span><img className='nav-user-logo' src={user.avatar} />Hello, {user.first_name}!</span>}>
          <Menu.Item key="stats">
            <Link to={`/monthly-statistics/${year}/${month}`}><Icon type='pie-chart' />Statistics (for geeks)</Link>
          </Menu.Item>
          <Menu.Divider key="divider1" />
          <Menu.Item key="account-settings">
            <Link to='/account-settings'><Icon type="setting" />Account Settings</Link>
          </Menu.Item>
          <Menu.Divider key="divider2" />
          {this.adminLink(user.admin)}
          <Menu.Item key="sign-out">
            <a onClick={this.signOut} title="Sign out" rel="nofollow" href="#"><Icon type='logout' />Sign out</a>
          </Menu.Item>
        </Menu.SubMenu>
      ]);
    } else {
      return <Menu.Item key='sign-in'><SignInLink /></Menu.Item>
    }
  }

  selectedKeys(location) {
    switch (true) {
      case /\/budgets/.test(location):
        return ["budgets"];
      case /\/detailed-budgets/.test(location):
        return ["detailed-budgets"];
      case /\/annual-budgets/.test(location):
        return ["annual-budgets"];
      default:
        return [];
    }
  }

  render() {
    const selectedKeys = this.selectedKeys(this.props.location);

    return (
      <header className="clearfix">
        <Row type="flex" justify="space-between">
          <Col span={4}>
            <Link id="logo" to='/'>
              <img src={logo} />
              <span>Budgetal</span>
            </Link>
          </Col>
          <Col span={20}>
            <Row type="flex" justify="end">
              <Col>
                <Menu mode='horizontal' id="nav" selectedKeys={selectedKeys}>
                  {this.renderMenuItems()}
               </Menu>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    );
  }
}
