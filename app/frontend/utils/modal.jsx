import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    cancel: React.PropTypes.func.isRequired,
    content: React.PropTypes.element.isRequired,
    modalType: React.PropTypes.oneOf(['blue', 'success', 'alert']),
    modalSize: React.PropTypes.oneOf(['tiny', 'small', 'large'])
  }

  isFormSubmission(event) {
    return event.target.type === 'submit' || event.target.parentElement.type === 'submit';
  }

  cancel = (e) => {
    var notFormSubmission = !this.isFormSubmission(e);

    if (notFormSubmission) {
      e.preventDefault();
      var stayOpen = _.isEmpty(_.intersection(e.target.classList, ['overlay', 'close-button']));
      if (!stayOpen) { this.props.cancel(); }
    }
  }

  render() {
    var titleClass  = `${this.props.modalType}-color`;
    var baseClasses = _.compact([this.props.modalSize, 'overlay']).join(' ');
    let classes = classNames(baseClasses, {
      fadeIn: this.props.hidden,
      hide: !this.props.hidden
    });
    return (
      <div className={classes} onClick={this.cancel}>
        <div className="page text-center">
          <a href='#' className="close-button" onClick={this.cancel}>&#215;</a>
          <h3 className={titleClass}>{this.props.title}</h3>
          <hr />
          {this.props.content}
        </div>
      </div>
    );
  }
}