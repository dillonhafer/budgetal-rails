import React from 'react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <div className='text-center'>
          <h3 className='blue'>The page you were looking for doesn't exist.</h3>
          <hr />
          <p>You may have mistyped the address or the page may have moved.</p>
        </div>
      </div>
    )
  }
}