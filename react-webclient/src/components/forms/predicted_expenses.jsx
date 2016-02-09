import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

export default class PredictedExpenses extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    predictions: [],
    select: function() {}
  }

  static propTypes = {
    predictions: React.PropTypes.array,
    select: React.PropTypes.func,
  }

  select = (e) => {
    this.props.select(e.target.textContent)
  }

  render() {
    var self = this
    let cls = classNames('predicted-expenses', {hide: !this.props.predictions.length})
    return (
      <ul className={cls}>
        {
          _.map(this.props.predictions, function(word, key) {
            return <li key={key}><a href='javscript:void(0)' onMouseDown={self.select}>{word}</a></li>
          })
        }
      </ul>
    )
  }
}