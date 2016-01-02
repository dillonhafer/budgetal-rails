import React from 'react';
import Sessions from './sessions';
import classNames from 'classnames';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    hide: true
  }

  showForm = () => {
    if (window.location.pathname == '/sessions/sign-in') {
      showMessage('Really?')
    } else {
      this.setState({hide: false});
    }
  }

  hideForm = () => {
    this.setState({hide: true});
  }

  render() {
    let overlayClasses = classNames('overlay', {hide: this.state.hide, fadeIn: !this.state.hide})
    return (
      <div>
        <a onClick={this.showForm} title='Sign In or Sign Up'>Sign in / Sign up</a>
        <div id='signInUp' className={overlayClasses}>
          <div className="page">
            <a className="close-button" onClick={this.hideForm}>&#215;</a>
            <Sessions />
          </div>
        </div>
      </div>
    );
  }
}