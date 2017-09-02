import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';

import { Col, Modal, Row } from 'antd';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelpModal: false,
    };
  }

  handleHelpClick = () => {
    this.setState({ showHelpModal: true });
  };

  handleHelpClose = () => {
    this.setState({ showHelpModal: false });
  };

  render() {
    return (
      <div className="footer">
        <Row type="flex" justify="space-around" align="middle">
          <Col md={1} xs={24} sm={24} />
          <Col md={10} xs={24} sm={24}>
            <Link to="/" className="budgetal-logo">
              <img src={logo} alt="Budgetal" />
            </Link>
            <ul className="links">
              <li className="copyright">
                © 2013–{new Date().getFullYear()} Budgetal.com. All rights
                reserved.
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li className="copyright">|</li>
              <li>
                <a onClick={this.handleHelpClick}>Help</a>
              </li>
            </ul>
          </Col>
          <Col md={5} xs={24} sm={24}>
            <ul className="social-icons">
              <li>
                <a
                  target="_blank"
                  href="http://www.twitter.com/budgetal"
                  className="twitter"
                />
              </li>
              <li>
                <a href="mailto:hello@budgetal.com" className="mail" />
              </li>
            </ul>
          </Col>
          <Col md={1} xs={24} sm={24} />
        </Row>
        <Modal
          title=""
          wrapClassName="help-modal"
          visible={this.state.showHelpModal}
          footer={null}
          onOk={this.handleHelpClose}
          onCancel={this.handleHelpClose}
        >
          <iframe src={HELP_FRAME} className="help-frame" />
        </Modal>
      </div>
    );
  }
}
