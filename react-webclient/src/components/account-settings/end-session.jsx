import React from 'react';

export default class EndSession extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    session: React.PropTypes.object,
    end: React.PropTypes.func.isRequired
  }

  end = (e) => {
    e.preventDefault();
    this.props.end(this.props.session);
  }

  render() {
    var plan = this.props.plan;
    return (
      <div>
        <p>Are you sure you want to end this session?</p>
        <p>This will sign out the device using it. And you will need to sign in again on that device</p>
        <a id="content-settings-overlay-confirm" href='#' className="small button alert radius" onClick={this.end}>
          <i className='fi-icon fi-trash'></i> End Session
        </a>
      </div>
    );
  }
}