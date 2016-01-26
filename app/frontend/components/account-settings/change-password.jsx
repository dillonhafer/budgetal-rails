import React from 'react';
import {changePassword} from '../../data/user';
import InputField from '../forms/input_field';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    passwordChange: {
      password: '',
      password_confirmation: '',
      current_password: ''
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
  }

  update = (e) => {
    let passwordChange = this.state.passwordChange;
    passwordChange[e.target.name] = e.target.value;
    this.setState({passwordChange});
  }

  save = (e) => {
    e.preventDefault();
    const data = {user: this.state.passwordChange, current_password: this.state.passwordChange.current_password}
    changePassword(data)
      .then((resp) => {
        const passwordChange = _.assign({}, this.state.passwordChange, resp);
        this.setState({passwordChange})

        if (!resp.errors) {
          showMessage(resp.message);
          this.setState({passwordChange: {}});
          this.refs.form.blur();
        }
      })
      .catch(this._fetchDataFail)
  }

  render() {
    const passwordChange = this.state.passwordChange;
    return (
      <div className='row collapse'>
        <div className='large-12 columns header-row'>
          <h3>Change Password</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className='row '>
                <form onSubmit={this.save} ref='form'>
                  <div className='large-12 medium-12 columns'>
                    <label htmlFor='password'>New Password</label>
                    <InputField onChange={this.update} required={true} type='password' id='password' name='password' placeholder='New Password' value={passwordChange.password} errors={passwordChange.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <label htmlFor='password_confirmation'>Password Confirmation</label>
                    <InputField onChange={this.update} required={true} type='password' id='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' value={passwordChange.password_confirmation} errors={passwordChange.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <label htmlFor='current_password_change'>Current Password</label>
                    <InputField onChange={this.update} required={true} type='password' id='current_password_change' name='current_password' placeholder='Current Password' value={passwordChange.current_password} errors={passwordChange.errors} />
                  </div>
                  <div className='large-12 medium-12 columns'>
                    <button type='submit' title='Change Password' className='tiny success radius button'><i className='fi-icon fi-check'></i> Change Password</button>
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