import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Nav from './layout/nav';
import Footer from './layout/footer';

class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <Nav location={this.props.location.pathname} />
            <ReactCSSTransitionGroup
              component="div"
              className="main-body"
              transitionName="example"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })}
            </ReactCSSTransitionGroup>
          <Footer />
        </div>
      </LocaleProvider>
    );
  }
}
module.exports = App;
