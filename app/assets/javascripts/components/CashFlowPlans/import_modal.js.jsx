var ImportModal = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    cancel: React.PropTypes.func.isRequired,
    import: React.PropTypes.func.isRequired
  },
  render() {
    let classes = classNames('overlay tiny', {
      fadeIn: !this.props.hidden,
      hide: this.props.hidden
    });
    return (
      <div className={classes}>
        <div className="page">
          <a href='#' className="close-button" onClick={this.props.cancel}>&#215;</a>
          <h3 className='text-center blue-color'>Import</h3>
          <hr />
          <p>Do you want to import budget items from your previous month's <strong>{this.props.category.name}</strong> category?</p>
          <a id="content-settings-overlay-confirm" href='#' className="tiny button expand radius" onClick={this.props.import}>Import</a>
        </div>
      </div>
    );
  }
})