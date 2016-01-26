import React from 'react';
import { Link } from 'react-router';
import {signOut} from '../../data/sessions';
import {userAuthenticated} from '../../utils/helpers';
import logo from '../../assets/images/logo.png';
import SignInLink from '../sessions/sign-in-link';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  signOut = (e) => {
    e.preventDefault();
    var self = this;
    signOut().then((resp) => {
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      showMessage('You are now signed out');
      this.context.history.replace('/');
    });
  }

  adminLink(admin) {
    if (admin) {
      return (
        <li><Link to='/admin'><i className='fi-lock'></i> Admin Panel</Link></li>
      );
    }
  }

  icon(name) {
    return <i className={`fi-${name}`}></i>
  }

  leftSection(signedIn) {
    if (signedIn) {
      var year  = (new Date).getFullYear();
      var month = (new Date).getMonth()+1;
      var user = JSON.parse(localStorage['user'])
      return (
        <ul className="right">
        </ul>
      );
    }
  }

  rightSection(signedIn) {
    if (signedIn) {
      var year  = (new Date).getFullYear();
      var month = (new Date).getMonth()+1;
      var user = JSON.parse(localStorage['user'])
      return (
        <ul className="right">
          <li><Link to={`/budgets/${year}/${month}`}> Budgets</Link></li>
          <li><Link to={`/detailed-budgets/${year}/${month}`}> Detailed Budgets</Link></li>
          <li><Link to={`/annual-budgets/${year}`}> Annual Budgets</Link></li>
          <li className="has-dropdown not-click"><a href="javascript:void(0)" id='js-user-greeting' title='this is you!'>Hello, {user.first_name}!</a>
            <ul className="dropdown shadow nav-links">
              <li><Link to={`/monthly-statistics/${year}/${month}`}>{this.icon('graph-pie')} Statistics (for geeks)</Link></li>
              <li><Link to='/account-settings'>{this.icon('widget')} Account Settings</Link></li>
              {this.adminLink(user.admin)}
              <li><a onClick={this.signOut} title="Sign out" rel="nofollow" href="#">{this.icon('x')} Sign out</a></li>
            </ul>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li><SignInLink /></li>
        </ul>
      );
    }
  }

  render() {
    var signedIn = userAuthenticated();
    return (
      <nav className="top-bar" data-topbar>
        <ul className="title-area">
          <li className="name">
            <h1><Link to='/'><img src={logo} style={{width: '200px'}}/></Link></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href="#"><span></span></a></li>
        </ul>
        <section className="top-bar-section">
          <ul className="left">
            {this.leftSection(signedIn)}
          </ul>
          <ul className="right">
            {this.rightSection(signedIn)}
          </ul>
        </section>
      </nav>
    );
  }
}
