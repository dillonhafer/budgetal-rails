var BudgetForm = React.createClass({
  getInitialState: function() {
    return {
      monthly_income: 0.00,
      not_budgeted: 0.00
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({
      monthly_income: parseFloat(newProps.budget.monthly_income),
      not_budgeted: parseFloat(newProps.budget.not_budgeted)
    })
  },
  errorsFor: function(field_name) {
    var message = ''
    var errors = this.props.budget.errors
    if (errors !== undefined && errors[field_name] != undefined) {
      var err = errors[field_name].toString().replace('_', ' ')
      message = `${field_name.capitalize()} ${err}`
    }
    return message
  },
  updateBudget: function(monthly_income, a) {
    var income = monthly_income.target.value
    var not_budgeted = income - this.props.budget.budgeted
    this.setState({monthly_income: income, not_budgeted: not_budgeted});
  },
  saveBudget: function(budget, e) {
    e.preventDefault();
    budget.monthly_income = this.state.monthly_income
    this.props.saveBudget(budget)
  },
  render: function() {
    var budget = this.props.budget
    return (
      <form data-abide onSubmit={this.saveBudget.bind(this, budget)}>
        <div className="row">
          <div className="large-5 medium-5 columns">
            <div>
              <label htmlFor='monthly_income'>Monthly Income</label>
              <input type='number' id='monthly_income' name='monthly_income' placeholder='0.00' onChange={this.updateBudget} value={this.state.monthly_income} step='any' min='0.00' className='green' required />
            </div>
            <div>
              <input type="submit" className='tiny button radius success expand' value="Update Monthly Income" />
            </div>
          </div>
          <div className="large-7 medium-7 columns text-center">
            <br /><h5>You have {numberToCurrency(this.state.not_budgeted)} Remaining to budget</h5>
          </div>
        </div>
      </form>
    )
  }
})