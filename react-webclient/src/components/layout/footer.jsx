import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';

import {Row,Col} from 'antd';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <Row>
          <Col span={10} offset={3}>
            <Link to="/" className="budgetal-logo"><img src={logo} alt='Budgetal' /></Link>
            <p className="copyright">© 2013–{(new Date).getFullYear()} Budgetal.com. All rights reserved. <Link to='/privacy'>Privacy</Link></p>
          </Col>
          <Col span={5} offset={3}>
            <ul className="social-icons">
              <li><a target='_blank' href="http://www.twitter.com/budgetal" className="twitter"></a></li>
              <li><a href="mailto:hello@budgetal.com" className="mail"></a></li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
