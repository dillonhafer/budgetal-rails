var PredictedExpenses = React.createClass({
  getDefaultProps: function() {
    return {
      predictions: []
    }
  },
  select: function(e) {
    this.props.select(e.target.textContent)
  },
  predictions: function() {
    var self = this
    let cls = classNames('predicted-expenses', {hide: !this.props.predictions.length})
    return (
      <ul className={cls}>
        {
          _.map(this.props.predictions, function(word, key) {
            return <li key={key} onMouseDown={self.select}>{word}</li>
          })
        }
      </ul>
    )
  },
  render: function() {
    return (this.predictions())
  }
})
