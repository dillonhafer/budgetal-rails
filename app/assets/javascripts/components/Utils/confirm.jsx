var Confirm = React.createClass({
  render() {
    let classes = classNames({
      overlay: true,
      fadeIn: !this.props.hidden,
      hide: this.props.hidden
    });
    return (
      <div className={classes}>
        <div className="page">
          <a href='#' className="close-button" onClick={this.props.cancel}>&#215;</a>
          <h3 className='text-center alert-color'>Confirm Delete</h3>
          <hr />
          <p>Are you sure you want to delete</p>
          <p><strong>{this.props.name}</strong></p>
          <p>This cannot be undone.</p>
          <a id="content-settings-overlay-confirm" href='#' className="tiny button alert radius" onClick={this.props.delete}>Delete {this.props.name}</a>
        </div>
      </div>
    );
  }
})