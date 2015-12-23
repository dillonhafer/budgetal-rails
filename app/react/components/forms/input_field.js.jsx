import React from 'react';
import classNames from 'classnames';
import InputError from './input_error';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  errorMessage() {
    var message = '';
    var field_name = this.props.name;
    var errors     = this.props.errors;
    if (errors && errors[field_name]) {
      var err = errors[field_name].toString();
      var name = field_name.capitalize().replace('_', ' ');
      message = `${name} ${err}`;
    }
    return message;
  }

  showError() {
    return this.props.errors && this.props.errors[this.props.name];
  }

  render() {
    let cls = classNames({error: this.showError()});
    return (
      <div className={cls}>
        <input {...this.props} />
        <InputError showError={this.showError()} message={this.errorMessage()} />
      </div>
    );
  }
}
