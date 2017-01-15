import React from 'react';
import {title, currentSession, humanUA, pluralize} from '../../utils/helpers';
import EndSession from './end-session';
import {allSessions, endSession} from '../../data/sessions';
import ChangePassword from './change-password';
import UpdateAccountInfo from './update-account-info';

import {
  Col,
  Row,
  Table,
  Modal,
  Icon,
  Button,
} from 'antd';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: {
        expired: [
        ],
        active: [
        ]
      },
      showEndSession: false,
      endSession: {},
      currentTime: (new Date).getTime()
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.state.intervalId);
  }

  componentDidMount = () => {
    title('Account Settings');
    this._fetchSessions();
    this._startTimer();
  }

  _startTimer = () => {
    const intervalId = setInterval(this.updateTime, 60000);
    this.setState({intervalId});
  }

  updateTime = () => {
    const currentTime = (new Date).getTime();
    this.setState({currentTime});
  }

  _fetchSessions = async() => {
    try {
      const resp = await allSessions();
      if (resp !== null) {
        this.setState({sessions: resp.sessions});
      }
    } catch(err) {
      apiError(err);
    }
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    browserHistory.replace('/');
  }

  fullSessionDate(date) {
    const sessionDate = new Date(date);
    return `${sessionDate.toDateString()} at ${sessionDate.toLocaleTimeString()}`;
  }

  sessionDate = (currentTime, date) => {
    let startDate = new Date(date);
    let secs = Math.floor((currentTime - startDate.getTime()) / 1000);
    if (secs < 3600) return `${pluralize(Math.floor(secs / 60), 'minute', 'minutes')} ago`;
    if (secs < 86400) return `${pluralize(Math.floor(secs / 3600), 'hour', 'hours')} ago`;
    if (secs < 604800) return `${pluralize(Math.floor(secs / 86400), 'day', 'days')} ago`;
    return this.fullSessionDate(date);
  }

  endSession = (session) => {
    endSession(session)
      .then((resp) => {
        this.endSessionDone(resp.sessions)
      })
      .catch(this._fetchDataFail)
  }

  endSessionDone(sessions) {
    showMessage('Session Ended');
    this.setState({sessions})
  }

  browser(ua) {
    const hua = humanUA(ua);
    let icon = "desktop";

    if (/chrome/i.test(hua)) {
      icon = "chrome";
    }

    if (/explorer/i.test(hua)) {
      icon = "windows";
    }

    if (/safari/i.test(hua)) {
      icon = "apple";
    }

    return <div><Icon type={icon} /> {hua}</div>;
  }

  handleOnClick = (session) => {
    Modal.error({
      className: 'delete-modal',
      okText: "End Session",
      title: "End Session",
      content: `Are you sure you want to end this session?\n\n This will sign out the device using it. And you will need to sign in again on that device.`,
      onOk: ()=> { this.endSession(session) },
      onCancel() {},
    });
  }

  activeDataSource = (sessions, currentTime) => {
    const current = [{
      key: "00",
      browser: this.browser(currentSession().user_agent),
      sign_in: this.sessionDate(currentTime, currentSession().created_at),
      sign_out: '(Current Session)',
    }];

    return current.concat(sessions.map((session,key) => {
      const onClick = () => {this.handleOnClick(session)};
      return {
        key,
        browser: this.browser(session.user_agent),
        sign_in: this.sessionDate(currentTime, session.created_at),
        sign_out: <Button onClick={onClick} className="delete-button">End Session</Button>,
      }
    }));
  }


  expiredDataSource = (sessions, currentTime) => {
    return sessions.map((session,key) => {
      return {
        key,
        browser: this.browser(session.user_agent),
        sign_in: this.sessionDate(currentTime, session.created_at),
        sign_out: this.fullSessionDate(session.expired_at),
      }
    });
  }

  activeHeaders() {
    return [
      {
        title: 'Browser',
        dataIndex: 'browser',
        key: 'browser',
      },
      {
        title: 'Signed In',
        dataIndex: 'sign_in',
        key: 'sign_in',
      },
      {
        title: '',
        dataIndex: 'sign_out',
        key: 'sign_out',
      },
    ]
  }

  expiredHeaders() {
    return [
      {
        title: 'Browser',
        dataIndex: 'browser',
        key: 'browser',
      },
      {
        title: 'Signed In',
        dataIndex: 'sign_in',
        key: 'sign_in',
      },
      {
        title: 'Signed Out',
        dataIndex: 'sign_out',
        key: 'sign_out',
      },
    ]
  }

  render() {
    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <Row>
            <Col span={13}>
              <UpdateAccountInfo />
            </Col>
            <Col span={10} offset={1}>
              <ChangePassword />
            </Col>
          </Row>

          <br />
          <br />

          <div className="header-row">
            <h3>Sessions</h3>
          </div>
          <div className="body-row">
            <Table dataSource={this.activeDataSource(this.state.sessions.active, this.state.currentTime)}
                   title={()=>{ return <b>Active Sessions</b>}}
                   pagination={false}
                   locale={{emptyText: "You don't have any active sessions."}}
                   columns={this.activeHeaders()} />
            <br />
            <Table dataSource={this.expiredDataSource(this.state.sessions.expired, this.state.currentTime)}
                   title={()=>{ return <b>Expired Sessions (last 10)</b>}}
                   pagination={false}
                   locale={{emptyText: "You don't have any expired sessions yet."}}
                   columns={this.expiredHeaders()} />
          </div>
        </Col>
      </Row>
    );
  }
}
