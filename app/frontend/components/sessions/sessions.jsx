import React from 'react';
import classNames from 'classnames';
import SignUp from './sign-up';
import SignIn from './sign-in';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signIn: false,
    signUp: false,
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

  render() {
    let optionsClasses = classNames('large-12 columns', {hide: this.state.signIn || this.state.signUp});
    let signInClasses  = classNames('large-12 columns', {hide: !this.state.signIn});
    let signUpClasses  = classNames('large-12 columns', {hide: !this.state.signUp});
    return (
      <div className='row'>
        <div className="small-12 large-12 columns">
          <div className='row'>
            <div className={optionsClasses}>
              <h2 className='text-center'>Welcome!</h2>
              <a onClick={this.showSignIn} href='#' className='option-link button expand radius'>Sign in</a>
              <a onClick={this.showJoinUs} href='#' className='option-link button expand radius success'>Join Us</a>
            </div>

            <div className={signInClasses}>
              <h2>Sign in</h2>
              <hr />
              <SignIn />
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>

            <div className={signUpClasses}>
              <h2>Join</h2>
              <hr />
              <SignUp />
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}