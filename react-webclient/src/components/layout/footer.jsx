import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <div className="row">
          <div className="medium-8 medium-8 pull-4 columns">
            <Link to="/" className="budgetal-logo"><img src={logo} alt='Budgetal' /></Link>
            <p className="copyright">© 2013–{(new Date).getFullYear()} Budgetal.com. All rights reserved. <Link to='/privacy'>Privacy</Link></p>
          </div>
          <div className="medium-4 medium-4 push-8 columns">
            <ul className="social-icons">
              <li><a target='_blank' href="http://www.twitter.com/budgetal" className="twitter"></a></li>
              <li><a href="mailto:hello@budgetal.com" className="mail"></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}