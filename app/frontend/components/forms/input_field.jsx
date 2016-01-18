import React from 'react';
import classNames from 'classnames';
import InputError from './input_error';
import Calendar from 'react-input-calendar';
import ReactDOM from 'react-dom';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  errorMessage = () => {
    var message = '';
    var field_name = this.props.name;
    var errors     = this.props.errors;
    if (errors && errors[field_name]) {
      var err  = errors[field_name].toString();
      var name = this.capitalize(field_name).replace('_', ' ');
      message  = `${name} ${err}`;
    }
    return message;
  }

  showError = () => {
    return this.props.errors && this.props.errors[this.props.name];
  }

  setReadOnly(c) {
    var el = ReactDOM.findDOMNode(c)
    if (el) {
      let input = el.children[0]
      input.setAttribute('readonly', true)
    }
  }

  field = () => {
    if (this.props.type === 'date' && this.props.date !== undefined) {
      var utcDate = this.props.date+'T12:00';
      return (
        <Calendar format="YYYY-MM-DD"
                  ref={this.setReadOnly}
                  computableFormat='YYYY-MM-DD'
                  placeholder='2015-08-01'
                  onChange={this.props.onChange}
                  closeOnSelect={true}
                  openOnInputFocus={true}
                  hideIcon={true}
                  date={utcDate} />
      )
    } else {
      return <input {...this.props} />
    }
  }

  render() {
    let cls = classNames({error: this.showError()});
    return (
      <div className={cls}>
        {this.field()}
        <InputError showError={this.showError()} message={this.errorMessage()} />
      </div>
    );
  }
}
