import React from 'react';
import classNames from 'classnames';
import {signIn, signUp} from '../../data/sessions';
import InputField from '../forms/input_field';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signIn: false,
    signUp: false,
    showPassword: false,
    newUser: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  showOptions = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: false
    });
  }

  showSignIn = (e) => {
    e.preventDefault();
    this.setState({
      signIn: true,
      signUp: false
    });
  }

  showJoinUs = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: true
    });
  }

  togglePassword = () => {
    let showPassword = !this.state.showPassword;
    this.setState({showPassword})
  }

  signIn(e) {
    e.preventDefault();
    let email       = e.target.querySelector('#loginEmail').value;
    let password    = e.target.querySelector('#loginPassword').value;
    let remember_me = e.target.querySelector('#remember_me').checked ? 1 : 0;
    let data = {user: {email, password, remember_me}}

    signIn(data)
      .done((json) => { window.location = '/'; })
      .fail((json) => { showMessage(json.responseJSON.message); })
  }

  signUp = (e) => {
    e.preventDefault();
    let data = {user: this.state.newUser}
    signUp(data)
      .done((json) => { window.location = '/'; })
      .fail((json) => {
        let newUser = this.state.newUser;
        newUser.errors = json.responseJSON.errors;
        this.setState({newUser});
        showMessage('Sign up failed');
      })
  }

  updateForm = (e) => {
    let newUser = this.state.newUser;
    newUser[e.target.name] = e.target.value;
    this.setState({newUser});
  }

  render() {
    let passwordType   = this.state.showPassword ? 'text' : 'password';
    let lockClass      = classNames({hidden_password: !this.state.showPassword});
    let optionsClasses = classNames('large-12 columns', {hide: this.state.signIn || this.state.signUp});
    let signInClasses  = classNames('large-12 columns', {hide: !this.state.signIn});
    let signUpClasses  = classNames('large-12 columns', {hide: !this.state.signUp});
    let newUser = this.state.newUser;
    return (
      <div className='row'>
        <div className="small-12 large-12 columns">
          <div className='row'>
            <div className={optionsClasses}>
              <h2 className='text-center'>Welcome!</h2>
              <a onClick={this.showSignIn} href='#' className='option-link button expand radius'>Sign in</a>
              <a onClick={this.showJoinUs} href='#' className='option-link button success radius expand'>Join Us</a>
            </div>

            <div className={signInClasses}>
              <h2>Sign in</h2>
              <hr />
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
                  <input type='password' id='loginPassword' required={true} tabIndex={2} />
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
              <form onSubmit={this.signUp} data-abide id='new_user'>
                <label htmlFor='email'>Email</label>
                <InputField type='email' onChange={this.updateForm} id='email' name='email' required={true} tabIndex={5} placeholder='email@example.org' value={newUser.email} errors={newUser.errors} />
                <div className='row collapse'>
                  <div className='small-6 columns'>
                    <label htmlFor='first_name'>First Name</label>
                    <InputField type='text' onChange={this.updateForm} id='first_name' name='first_name' required={true} tabIndex={6} value={newUser.first_name} errors={newUser.errors} />
                  </div>
                  <div className='small-5 small-offset-1 columns'>
                    <label htmlFor='last_name'>Last Name</label>
                    <InputField type='text' onChange={this.updateForm} id='last_name' name='last_name' required={true} tabIndex={7} value={newUser.last_name} errors={newUser.errors} />
                  </div>
                </div>

                <div className='clearfix'>
                  <label htmlFor='password' className='left'>Password</label>
                  <small className='right'><a id="hide_password" className={lockClass} onClick={this.togglePassword}></a></small>
                  <InputField type={passwordType} id='password' name='password' onChange={this.updateForm} value={newUser.password} errors={newUser.errors} tabIndex={8} />
                </div>

                <label htmlFor='password_confirmation'>Password Confirmation</label>
                <InputField type={passwordType} onChange={this.updateForm} value={newUser.password_confirmation} errors={newUser.errors} id='password_confirmation' name='password_confirmation' required={true} data-eualto='new_user_password' tabIndex={9} />
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