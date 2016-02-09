import React from 'react';

export default class Maintenance extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <div className='text-center'>
          <h3 className='blue'>We are performing scheduled maintenance right now.</h3>
          <hr />
          <p>We will be done shortly.</p>
        </div>
      </div>
    )
  }
}