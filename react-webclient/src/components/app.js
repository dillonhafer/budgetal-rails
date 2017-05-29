import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
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
            <CSSTransitionGroup
              component="div"
              className="main-body"
              transitionName="main"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })}
            </CSSTransitionGroup>
          <Footer />
        </div>
      </LocaleProvider>
    );
  }
}
module.exports = App;
