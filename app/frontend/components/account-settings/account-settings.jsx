import React from 'react';
import {currentUser, title, currentSession, humanUA} from '../../utils/helpers';

import {allSessions} from '../../data/sessions';

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

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  componentDidMount = () => {
    title('Account Settings');
    this._fetchSessions();
  }

  _fetchSessions = () => {
    allSessions()
      .then((resp) => {
        this._fetchDataDone(resp);
      })
      .catch(this._fetchDataFail)
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
  }

  _fetchDataDone = (data) => {
    this.setState({sessions: data.sessions});
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
                <div className="small-12 large-12 columns">
                  <table>
                    <caption><b>Active Sessions</b></caption>
                    <thead>
                      <tr>
                        <th>Browser</th>
                        <th>Signed in</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{humanUA(navigator.userAgent)}</td>
                        <td>{currentSession.created_at}</td>
                        <td>(Current Session)</td>
                      </tr>
                    {
                      this.state.sessions.active.map((session, index) => {
                        return (
                          <tr key={index}>
                            <td>{humanUA(session.user_agent)}</td>
                            <td>{session.created_at}</td>
                            <td><a className='tiny alert button radius'>End Session</a></td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='row'>
                <div className="small-12 large-12 columns">
                  <table>
                    <caption><b>Expired Sessions (last 10)</b></caption>
                    <thead>
                      <tr>
                        <th>Browser</th>
                        <th>Signed in</th>
                        <th>Signed out</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.sessions.expired.map((session, index) => {
                        return (
                          <tr key={index}>
                            <td>{humanUA(session.user_agent)}</td>
                            <td>{session.created_at}</td>
                            <td>{session.expired_at}</td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
