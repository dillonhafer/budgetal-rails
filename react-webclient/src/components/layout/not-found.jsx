import React from 'react';

export default class NotFound extends React.Component {
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
            The page you were looking for doesn't exist.
          </h1>
          <hr />
          <p>You may have mistyped the address or the page may have moved.</p>
        </div>
      </div>
    );
  }
}
