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

  handleFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    let user = this.state.user;

    if (_.round(e.target.files[0].size / 1048576, 2) > 1) {
      showMessage('Your photo is too large. The limit is 1 MB')
    } else {
      reader.onload = (upload) => {
        user.avatar = upload.target.result;
        this.setState({user});
      }

      reader.readAsDataURL(file);
    }
  }

  selectFile = (e) => {
    e.preventDefault();
    this.refs.file.click();
  }

  render() {
    const user = this.state.user;
    return (
      <div className='row collapse'>
        <div className='large-12 columns header-row'>
          <h3>Account Info</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories account-settings">
            <li>
              <div className='row collapse'>
                <form onSubmit={this.save} ref='form'>
                  <div className='large-4 columns text-center'>
                    <img className='shadow' style={{height: '140px', width: '140px', border: '5px solid white'}} onClick={this.selectFile} src={user.avatar} />
                    <br />
                    <a onClick={this.selectFile} className='button tiny radius'>Upload Photo</a>
                    <input className='hide' type="file" ref='file' onChange={this.handleFile} />
                  </div>
                  <div className="large-8 medium-8 columns">
                    <label htmlFor='first_name'>First Name</label>
                    <InputField onChange={this.update} required={true} type='text' id='first_name' name='first_name' placeholder='First Name' value={user.first_name} errors={user.errors} />
                  </div>
                  <div className="large-8 medium-8 columns">
                    <label htmlFor='last_name'>Last Name</label>
                    <InputField onChange={this.update} required={true} type='text' id='last_name' name='last_name' placeholder='Last Name' value={user.last_name} errors={user.errors} />
                  </div>
                  <div className='large-8 medium-8 columns'>
                    <label htmlFor='email'>Email</label>
                    <InputField onChange={this.update} required={true} type='email' id='email' name='email' placeholder='email@example.com' value={user.email} errors={user.errors} />
                  </div>
                  <hr />
                  <div className='large-7 medium-7 columns'>
                    <label htmlFor='current_password'>Current Password</label>
                    <InputField onChange={this.update} required={true} type='password' id='current_password' name='current_password' placeholder='Current Password' value={user.current_password} errors={user.errors} />
                  </div>
                  <div className='large-5 medium-5 columns'>
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