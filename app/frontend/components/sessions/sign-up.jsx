import React from 'react';
import classNames from 'classnames';
import {signUp} from '../../data/sessions';
import InputField from '../forms/input_field';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showPassword: false,
    newUser: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  togglePassword = () => {
    let showPassword = !this.state.showPassword;
    this.setState({showPassword})
  }

  signUp = (e) => {
    e.preventDefault();
    let data = {user: this.state.newUser}
    let self = this;
    signUp(data)
      .then((resp) => {
        if (!!resp.errors) {
          let newUser = data.user;
          newUser.errors = resp.errors;
          self.setState({newUser});
          showMessage('Oh no! Sign up failed');
        } else {
          showMessage('Welcome to Budgetal!');
          this.context.history.replace('/');
        }
      })
  }

  updateForm = (e) => {
    let newUser = this.state.newUser;
    newUser[e.target.name] = e.target.value;
    this.setState({newUser});
  }

  render() {
    let passwordType = this.state.showPassword ? 'text' : 'password';
    let lockClass    = classNames({hidden_password: !this.state.showPassword});
    let newUser      = this.state.newUser;
    return (
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
          <InputField type={passwordType} id='password' name='password' onChange={this.updateForm} value={newUser.password} errors={newUser.errors} required={true} tabIndex={8} />
        </div>

        <label htmlFor='password_confirmation'>Password Confirmation</label>
        <InputField type={passwordType} onChange={this.updateForm} value={newUser.password_confirmation} errors={newUser.errors} id='password_confirmation' name='password_confirmation' required={true} data-eualto='new_user_password' tabIndex={9} />
        <div>
          <input type='submit' className='small button radius nice' tabIndex={10} value='Sign up' />
        </div>
      </form>
    )
  }
}
