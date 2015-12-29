import React from 'react';
import classNames from 'classnames';
import {login} from '../../data/sessions';
import InputField from '../forms/input_field';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signIn: false,
    signUp: false,
    showPassword: false
  }

  showOptions = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: false
    });
  }

  showSignIn = () => {
    this.setState({
      signIn: true,
      signUp: false
    });
  }

  showJoinUs = () => {
    this.setState({
      signIn: false,
      signUp: true
    });
  }

  togglePassword = () => {
    let showPassword = !this.state.showPassword;
    this.setState({showPassword})
  }

  login(e) {
    e.preventDefault();
    let email       = e.target.querySelector('#email').value;
    let password    = e.target.querySelector('#password').value;
    let remember_me = e.target.querySelector('#remember_me').checked ? 1 : 0;
    let data = {user: {email, password, remember_me}}

    login(data)
      .done((json) => { window.location = '/'; })
      .fail((json) => { showMessage(json.responseJSON.message); })
  }

  render() {
    let passwordType   = this.state.showPassword ? 'text' : 'password';
    let lockClass      = classNames({hidden_password: !this.state.showPassword});
    let optionsClasses = classNames('large-12 columns', {hide: this.state.signIn || this.state.signUp});
    let signInClasses  = classNames('large-12 columns', {hide: !this.state.signIn});
    let signUpClasses  = classNames('large-12 columns', {hide: !this.state.signUp});
    return (
      <div className='row'>
        <div className="small-12 large-12 columns">
          <div className='row'>
            <div className={optionsClasses}>
              <h2 className='text-center'>Welcome!</h2>
              <a onClick={this.showSignIn} className='option-link button expand radius'>Sign in</a>
              <a onClick={this.showJoinUs} className='option-link button success radius expand'>Join Us</a>
            </div>

            <div className={signInClasses}>
              <h2>Sign in</h2>
              <hr />
              <form data-abide onSubmit={this.login}>
                <div className='clearfix'>
                  <label htmlFor='email' className='left'>Email</label>
                  <label htmlFor='remember_me' className='right'>
                    <input tabIndex="3" type="checkbox" value="1" defaultChecked={true} id="remember_me" />
                    &nbsp; remember me
                  </label>
                  <input type='email' id='email' required={true} tabIndex={1} />
                  <small className='error'>An email address is required.</small>
                </div>

                <div className='clearfix'>
                  <label className='left' htmlFor='password'>Password</label>
                  <small className='right'><a id="hide_password" className={lockClass} onClick={this.togglePassword}></a></small>
                  <input type='password' id='password' required={true} tabIndex={2} />
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
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>

            <div className={signUpClasses}>
              <h2>Join</h2>
              <hr />
              <form data-abide>
                <label htmlFor='new_user_email'>Email</label>
                <input type='email' id='new_user_email' required={true} tabIndex={5} placeholder='email@example.org' />
                <small className="error">Email is required.</small>
                <div className='row collapse'>
                  <div className='small-6 columns'>
                    <label htmlFor='first_name'>First Name</label>
                    <input type='text' id='first_name' required={true} tabIndex={6} pattern='alpha' />
                    <small className="error">First Name is required.</small>
                  </div>
                  <div className='small-5 small-offset-1 columns'>
                    <label htmlFor='last_name'>Last Name</label>
                    <input type='text' id='last_name' required={true} tabIndex={7} pattern='alpha' />
                    <small className="error">Last Name is required.</small>
                  </div>
                </div>

                <div className='clearfix'>
                  <label htmlFor='new_user_password' className='left'>Password</label>
                  <small className='right'><a id="hide_password" className={lockClass} onClick={this.togglePassword}></a></small>
                  <input type={passwordType} id='new_user_password' required={true} tabIndex={8} />
                  <small className="error">Passwords must be at least 8 characters.</small>
                </div>

                <label htmlFor='new_user_password_confirmation'>Password Confirmation</label>
                <input type={passwordType} id='new_user_password_confirmation' required={true} data-eualto='new_user_password' tabIndex={9} />
                <small className="error">Password confirmation must match.</small>
                <div>
                  <input type='submit' className='small button radius nice' tabIndex={10} value='Sign up' />
                </div>
              </form>
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}