import React from 'react';
import classNames from 'classnames';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    cancel: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  }

  cancel = (e) => {
    e.preventDefault();
    var stayOpen = _.isEmpty(_.intersection(e.target.classList, ['overlay', 'close-button']));
    if (!stayOpen) { this.props.cancel(); }
  }

  render() {
    let classes = classNames({
      overlay: true,
      fadeIn: !this.props.hidden,
      hide: this.props.hidden
    });
    return (
      <div className={classes} onClick={this.cancel}>
        <div className="page text-center">
          <a href='#' className="close-button" onClick={this.cancel}>&#215;</a>
          <h3 className=' alert-color'>Confirm Delete</h3>
          <hr />
          <p>Are you sure you want to delete</p>
          <p><strong>{this.props.name}</strong></p>
          <p>This cannot be undone.</p>
          <a id="content-settings-overlay-confirm" href='#' className="small button alert radius" onClick={this.props.delete}>
            <i className='fi-icon fi-trash'></i> Delete {this.props.name}
          </a>
        </div>
      </div>
    );
  }
}