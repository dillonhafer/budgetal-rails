var Overview = React.createClass({
  errorsFor: function(field_name) {
    var message = ''
    var errors = this.props.budget.errors
    if (errors !== undefined && errors[field_name] != undefined) {
      var err = errors[field_name].toString().replace('_', ' ')
      message = `${field_name.capitalize()} ${err}`
    }
    return message
  },
  percentSpent: function() {
    var p = this.props.budget.spent / this.props.budget.budgeted * 100;
    return p > 99 ? 100 : p;
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
      'red-meter': this.percentSpent() > 99
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
                <form data-abide>
                  <div className="row">
                    <div className="large-5 medium-5 columns">
                      <div>
                        <label htmlFor='monthly-income'>Monthly Income</label>
                        <InputField type='number' name='monthly_income' placeholder='0.00' value={numberToCurrency(budget.monthly_income,'')} step='any' min='0.00' className='green' error={this.errorsFor('monthly_income')} />
                      </div>
                      <div>
                        <a href='#' className='tiny button radius success expand'>Update Monthly Income</a>
                      </div>
                    </div>
                    <div className="large-7 medium-7 columns text-center">
                      <br /><h5>You have {numberToCurrency(budget.not_budgeted)} Remaining to budget</h5>
                    </div>
                  </div>
                </form>
                <Chart selector='monthly-overview' spent={this.percentSpent()} remaining={100 - this.percentSpent()} />
              </li>
            </ul>
          </div>
        </div>

      </div>
		)
	}
})