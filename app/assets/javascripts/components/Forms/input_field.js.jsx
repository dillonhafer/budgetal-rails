var InputField = React.createClass({
  errorMessage: function() {
    var message = ''
    var field_name = this.props.name
    var errors     = this.props.errors
    if (errors && errors[field_name]) {
      var err = errors[field_name].toString()
      var name = field_name.capitalize().replace('_', ' ')
      message = `${name} ${err}`
    }
    return message
  },
  showError: function() {
    return this.props.errors && this.props.errors[this.props.name]
  },
  render: function() {
    let cls = classNames({error: this.showError()})
    return (
      <div className={cls}>
        <input type={this.props.type} name={this.props.name} readOnly={this.props.readOnly} onChange={this.props.onChange} value={this.props.value} defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} step={this.props.step} min={this.props.min} className={this.props.className} />
        <InputError showError={this.showError()} message={this.errorMessage()} />
      </div>
    )
  }
})
