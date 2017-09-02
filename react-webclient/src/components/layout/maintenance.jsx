import React from 'react';

export default class Maintenance extends React.Component {
  render() {
    const style = {
      padding: '24px',
      margin: '24px',
      marginTop: '100px',
    };
    return (
      <div className="not-found" style={style}>
        <div className="text-center">
          <h1 className="primary-color">
            We are performing scheduled maintenance right now.
          </h1>
          <hr />
          <p>We will be done shortly.</p>
        </div>
      </div>
    );
  }
}
