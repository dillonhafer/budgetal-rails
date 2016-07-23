import React, {Component} from 'react';
import classNames from 'classnames';
import {resetPassword} from '../../data/user';
import InputField from '../forms/input_field';

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      newUser: {
        password: '',
        password_confirmation: ''
      }
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  updateForm = (e) => {
    let newUser = this.state.newUser;
    newUser[e.target.name] = e.target.value;
    this.setState({newUser});
  }

  togglePassword = () => {
    let showPassword = !this.state.showPassword;
    this.setState({showPassword})
  }

  resetPassword = async() => {
    try {
      const resp = await resetPassword({
        password_reset_token: this.props.password_reset_token,
        user: this.state.user
      });

      if (resp && resp.success) {
        this.props.goBack();
        window.alert({title: 'Password Reset', message: "Your password has been updated"});
      } else {
        this.props.goBack();
        window.alert({title: 'Password Reset Failed', message: "Your email may have expired."});
      }
    } catch (err) {
      console.log(err);
    }
  }

  resetPassword = (e) => {
    e.preventDefault();
    const params = {
      password_reset_token: this.props.location.query.reset_password_token,
      user: this.state.newUser
    }

    resetPassword(params).then((resp) => {
      if (resp && resp.success) {
        showMessage("Your password has been updated");
      } else {
        showMessage("Password Reset Failed. Your email may have expired.");
      }
      this.context.history.replace('/');
    })
  }

  render() {
    let passwordType = this.state.showPassword ? 'text' : 'password';
    let lockClass    = classNames({hidden_password: !this.state.showPassword});
    let newUser      = this.state.newUser;

    return (
      <div className='row changePasswordContainer small-centered'>
        <div className='large-5 columns'>
          <h1>Change your password</h1>
          <form data-abide onSubmit={this.resetPassword}>
            <div className='clearfix'>
              <label htmlFor='password' className='left'>Password</label>
              <small className='right'><a id="hide_password" className={lockClass} onClick={this.togglePassword}></a></small>
              <InputField type={passwordType} id='password' name='password' onChange={this.updateForm} value={newUser.password} errors={newUser.errors} required={true} tabIndex={1} />
            </div>

            <label htmlFor='password_confirmation'>Password Confirmation</label>
            <InputField type={passwordType} onChange={this.updateForm} value={newUser.password_confirmation} errors={newUser.errors} id='password_confirmation' name='password_confirmation' required={true} data-eualto='new_user_password' tabIndex={2} />

            <div className='row collapse'>
              <div className='large-12 columns'>
                <input type="submit" value="Change Password" className="small button radius nice expand" tabIndex="3" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
