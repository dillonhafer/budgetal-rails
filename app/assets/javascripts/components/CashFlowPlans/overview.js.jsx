var Overview = React.createClass({
  percentSpent: function() {
    var p = this.props.budget.spent / this.props.budget.budgeted * 100;
    return p > 99 ? 100 : parseInt(p);
  },
  meterWidth: function() {
    var width = `${this.percentSpent()}%`
    return {
      width: width
    }
  },
  meterClasses: function() {
    return classNames({
      'meter': true,
      'red-meter': this.props.budget.remaining < 0
    });
  },
  remainingClasses: function() {
    return classNames({
      'right remaining': true,
      'alert-color': this.props.budget.remaining < 0,
      'blue-color': this.props.budget.remaining > 0
    });
  },
	render: function() {
    var budget = this.props.budget
		return (
			<div className='large-6 medium-6 large-offset-1 columns overview-partial'>
        <div className='row collapse monthly-overview-stats'>
          <div className='large-12 medium-12 columns header-row'>
            <h3>Monthly Overview</h3>
          </div>
          <div className="small-12 large-12 medium-12 columns">
            <ul>
              <li>
                <div className="row">
                  <div className="large-12 medium-12 columns">
                    <span className='spent success-color'>
                      Spent: {numberToCurrency(budget.spent)}
                    </span>
                    <span className={this.remainingClasses()}>
                      Remaining: {numberToCurrency(budget.remaining)}
                    </span>
                    <div className="progress radius">
                      <span className={this.meterClasses()} style={this.meterWidth()}></span>
                    </div>
                  </div>
                </div>
                <hr />
                <BudgetForm budget={budget} saveBudget={this.props.saveBudget} />
                <Chart selector='monthly-overview' spent={this.percentSpent()} remaining={100 - this.percentSpent()} />
              </li>
            </ul>
          </div>
        </div>

      </div>
		)
	}
})