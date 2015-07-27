var InputError = React.createClass({
  getDefaultProps: function() {
    return {
      showError: false,
      message: ''
    }
  },
  render() {
    let cls = classNames({show: this.props.showError, error: true})
    return (
      <small className={cls}>{this.props.message}</small>
    )
  }
})
