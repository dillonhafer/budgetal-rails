import React from 'react';
import {updateAccountInfo} from '../../data/user';
import {currentUser} from '../../utils/helpers';
import InputField from '../forms/input_field';

export default class UpdateAccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: currentUser()
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
  }

  update = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }

  save = (e) => {
    e.preventDefault();
    const data = {user: this.state.user, current_password: this.state.user.current_password}
    updateAccountInfo(data)
      .then((resp) => {
        const user = _.assign({}, this.state.user, resp);
        this.setState({user})

        if (!resp.errors) {
          this.saveDone(resp.message);
        }
      })
      .catch(this._fetchDataFail)
  }

  saveDone = (message) => {
    showMessage(message);
    let user    = _.assign({}, this.state.user, {current_password:'', errors: ''});
    let current = _.assign({}, currentUser(), user);

    this.setState({user});
    localStorage.setItem('user', JSON.stringify(current));
    this.context.history.replace('/account-settings');
  }

  render() {
    const user = this.state.user;
    return (
      <div className='row collapse'>
        <div className='large-12 columns header-row'>
          <h3>Account Info</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className='row collapse'>
                <form onSubmit={this.save} ref='form'>
                  <div className="large-6 medium-6 columns">
                    <label htmlFor='first_name'>First Name</label>
                    <InputField onChange={this.update} required={true} type='text' id='first_name' name='first_name' placeholder='First Name' value={user.first_name} errors={user.errors} />
                  </div>
                  <div className="large-6 medium-6 columns">
                    <label htmlFor='last_name'>Last Name</label>
                    <InputField onChange={this.update} required={true} type='text' id='last_name' name='last_name' placeholder='Last Name' value={user.last_name} errors={user.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <label htmlFor='email'>Email</label>
                    <InputField onChange={this.update} required={true} type='email' id='email' name='email' placeholder='email@example.com' value={user.email} errors={user.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <label htmlFor='current_password'>Current Password</label>
                    <InputField onChange={this.update} required={true} type='password' id='current_password' name='current_password' placeholder='Current Password' value={user.current_password} errors={user.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <button type='submit' title='Update' className='tiny success radius button'><i className='fi-icon fi-check'></i> Update Account Info</button>
                  </div>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}