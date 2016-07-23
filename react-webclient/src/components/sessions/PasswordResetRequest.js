import React, {Component} from 'react';
import classNames from 'classnames';
import {resetPasswordRequest} from '../../data/user';

export default class PasswordResetRequest extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  resetPassword = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#resetEmail').value;
    resetPasswordRequest({email}).then((json) => {
      showMessage("We just sent you an email with instructions on how to reset your password");
      this.context.history.replace('/');
    })
  }

  render() {
    return (
      <form data-abide onSubmit={this.resetPassword}>
        <div className='clearfix'>
          <label htmlFor='loginEmail' className='left'>Email</label>
          <input type='email' id='resetEmail' required={true} tabIndex={1} />
          <small className='error'>An email address is required.</small>
        </div>

        <div className='row collapse'>
          <div className='large-12 columns'>
            <input type="submit" value="Request Password Reset" className="small button radius nice expand" tabIndex="2" />
          </div>
        </div>
      </form>
    )
  }
}
