import React from 'react';
import { Link } from 'react-router';
import {signOut} from '../../data/sessions';
import {userAuthenticated, getCookie} from '../../utils/helpers';
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
      showMessage(resp.message);
      self.context.history.replace('/');
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

  sessionLink(signedIn) {
    if (signedIn) {
      var year  = (new Date).getFullYear();
      var month = (new Date).getMonth()+1;
      var user = JSON.parse(decodeURIComponent(getCookie('current_user')));
      return (
        <ul className="right">
          <li className="has-dropdown not-click"><a href="javascript:void(0)" title='this is you!'>Hello, {user.first_name}!</a>
            <ul className="dropdown shadow nav-links">
              <li><Link to={`/cash-flow-plans/${year}/${month}`}>{this.icon('dollar')} Cash Flow Plans</Link></li>
              <li><Link to={`/allocation-plans/${year}/${month}`}>{this.icon('clipboard-pencil')} Allocated Spending Plans</Link></li>
              <li><Link to={`/annual-budgets/${year}`}>{this.icon('calendar')} Annual Budgets</Link></li>
              <li><Link to={`/monthly-statistics/${year}/${month}`}>{this.icon('graph-pie')} Statistics (for geeks)</Link></li>
              <li><a href='/sessions/sign-up/edit'>{this.icon('widget')} My Account</a></li>
              {this.adminLink(user.admin)}
            </ul>
          </li>
          <li><a onClick={this.signOut} title="Sign out" rel="nofollow" href="#">Sign out</a></li>
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
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>
        <section className="top-bar-section">
          <ul className="right">
            {this.sessionLink(signedIn)}
          </ul>
        </section>
      </nav>
    );
  }
}
