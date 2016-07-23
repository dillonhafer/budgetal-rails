import React from 'react';
import classNames from 'classnames';
import SignUp from './sign-up';
import SignIn from './sign-in';
import PasswordResetRequest from './PasswordResetRequest';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    signIn: false,
    signUp: false,
    resetPassword: false,
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  showOptions = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: false,
      resetPassword: false,
    });
  }

  showSignIn = (e) => {
    e.preventDefault();
    this.setState({
      signIn: true,
      signUp: false,
      resetPassword: false,
    });
  }

  showJoinUs = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: true,
      resetPassword: false,
    });
  }

  showPasswordReset = (e) => {
    e.preventDefault();
    this.setState({
      signIn: false,
      signUp: false,
      resetPassword: true,
    });
  }

  render() {
    const optionsClasses = classNames('large-12 columns', {hide: this.state.signIn || this.state.signUp || this.state.resetPassword});
    const signInClasses  = classNames('large-12 columns', {hide: !this.state.signIn});
    const signUpClasses  = classNames('large-12 columns', {hide: !this.state.signUp});
    const resetPasswordClasses = classNames('large-12 columns', {hide: !this.state.resetPassword});
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
              <SignIn showPasswordReset={this.showPasswordReset} />
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>

            <div className={signUpClasses}>
              <h2>Join</h2>
              <hr />
              <SignUp />
              <a className='option-link' onClick={this.showOptions}>Back</a>
            </div>

            <div className={resetPasswordClasses}>
              <h2>Request Password Reset</h2>
              <hr />
              <PasswordResetRequest />
              <a className='option-link' onClick={this.showSignIn}>Back</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
