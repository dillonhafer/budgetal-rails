import React from 'react';
import classNames from 'classnames';
import {users} from '../../data/admin';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    users: []
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  componentDidMount() {
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

  render() {
    var classes = classNames('row collapse', {hide: !this.state.users.length});
    return (
      <div className={classes}>
        <div className='large-12 columns header-row'>
          <h3>Admin Panel</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>User Email</th>
                    <th>Last Sign in</th>
                    <th>IP</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.users.map((user,index) => {
                    return (
                      <tr key={index}>
                        <td>{user.first_name}, <b>{user.last_name}</b></td>
                        <td>{user.email}</td>
                        <td>{this.signInDate(user.current_sign_in_at)}</td>
                        <td>{user.current_sign_in_ip}</td>
                        <td>{user.sign_in_count}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
