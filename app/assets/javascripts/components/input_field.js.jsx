var InputField = React.createClass({
  showError() {
    return this.props.error !== ''
  },
  render() {
    let cls = classNames({error: this.showError()})
    return (
      <div className={cls}>
        <input type={this.props.type} name={this.props.name} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder} step={this.props.step} min={this.props.min} className={this.props.className} />
        <InputError showError={this.showError()} message={this.props.error} />
      </div>
    )
  }
})
