import React from 'react';
import classNames from 'classnames';
import {signIn} from '../../data/sessions';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showPassword: false
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  togglePassword = () => {
    let showPassword = !this.state.showPassword;
    this.setState({showPassword})
  }

  signIn = (e) => {
    e.preventDefault();
    let email       = e.target.querySelector('#loginEmail').value;
    let password    = e.target.querySelector('#loginPassword').value;
    let remember_me = e.target.querySelector('#remember_me').checked ? 1 : 0;
    let data = {user: {email, password, remember_me}}

    signIn(data)
      .then((resp) => {
        if (resp.success) {
          localStorage.setItem('session', JSON.stringify(resp.session));
          localStorage.setItem('user', JSON.stringify(resp.user));
          showMessage('You are now signed in');
          this.context.history.replace('/');
        } else {
          showMessage(resp.message)
        }
      })
  }

  render() {
    let passwordType = this.state.showPassword ? 'text' : 'password';
    let lockClass    = classNames({hidden_password: !this.state.showPassword});
    return (
      <form data-abide onSubmit={this.signIn}>
        <div className='clearfix'>
          <label htmlFor='loginEmail' className='left'>Email</label>
          <label htmlFor='remember_me' className='right'>
            <input tabIndex="3" type="checkbox" value="1" defaultChecked={true} id="remember_me" />
            &nbsp; remember me
          </label>
          <input type='email' id='loginEmail' required={true} tabIndex={1} />
          <small className='error'>An email address is required.</small>
        </div>

        <div className='clearfix'>
          <label className='left' htmlFor='loginPassword'>Password</label>
          <small className='right'><a id="hide_password" className={lockClass} onClick={this.togglePassword}></a></small>
          <input type={passwordType} id='loginPassword' required={true} tabIndex={2} />
          <small className='error'>A password is required.</small>
        </div>
        <div className='row collapse'>
          <div className='large-4 columns'>
            <input type="submit" value="Sign in" className="small button radius nice expand" tabIndex="4" />
          </div>

          <div className='large-6 large-offset-1 columns'>
            <a className="tiny button radius dark-blue" href="/sessions/secret/new">Forgot your password?</a>
          </div>
        </div>
      </form>
    )
  }
}
