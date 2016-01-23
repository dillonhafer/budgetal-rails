import React from 'react';
import parser from 'ua-parser-js';
import {currentUser} from '../../utils/helpers';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: currentUser(),
    sessions: {
      expired: [
      ],
      active: [
      ]
    }
  }

  humanUA(userAgent) {
    let ua = parser(userAgent);
    return `${ua.browser.name} ${ua.browser.major} on ${ua.os.name}`;
  }

  render() {
    var user = this.state.user;
    return (
      <div className='row collapse'>
        <div className='large-12 columns header-row'>
          <h3>Account Settings</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              Hi {user.first_name}
            </li>
          </ul>
        </div>

        <div className='large-12 columns header-row'>
          <h3>Sessions</h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className='row'>
                <div className='small-12 columns'>
                  <b>Current Session:</b> {this.humanUA(navigator.userAgent)}
                </div>
              </div>
              <div className='row'>
                <div className="small-6 large-6 columns">
                  <b>Active Sessions</b>
                  <ul>
                    {
                      this.state.sessions.active.map((session, index) => {
                        return (
                          <li key={index}>
                            {this.humanUA(session.user_agent)}
                            <a className='tiny alert button radius'>End Session</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="small-6 large-6 columns">
                  <b>Expired Sessions</b>
                  <ul>
                    {
                      this.state.sessions.expired.map((session, index) => {
                        return (
                          <li key={index}>{this.humanUA(session.user_agent)}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
