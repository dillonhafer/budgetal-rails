var PredictedExpenses = React.createClass({
  propTypes: {
    predictions: React.PropTypes.array,
    select: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      predictions: [],
      select: function() {}
    }
  },

  select(e) {
    this.props.select(e.target.textContent)
  },

  predictions() {
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
  },

  render() {
    return (this.predictions())
  }
})
