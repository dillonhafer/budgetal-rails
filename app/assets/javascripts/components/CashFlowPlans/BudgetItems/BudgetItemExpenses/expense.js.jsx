var Expense = React.createClass({
	propTypes: {
    expense: React.PropTypes.object.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
  	return {predictions: []}
  },
  predict: function(word) {
  	var self = this
  	if (word.length > 2) {
  		ExpenseController.predictions(word)
  			.done(function(list) {
			  	self.setState({predictions: list})
  			})
  			.fail(function() {
			  	self.setState({predictions: []})
  			})
  	} else {
	  	self.setState({predictions: []})
  	}
  },
  save: function(e) {
		e.preventDefault()
		var expense = this.props.expense
		expense.index = this.props.index
		this.props.save(this.props.expense)
	},
	update: function(expense,e) {
		expense[e.target.name] = e.target.value
		this.props.update(this.props.index, expense)
		if (e.target.name == 'name') {
			this.predict(e.target.value)
		}
	},
	select: function(word) {
		var expense = this.props.expense
		expense.name = word
		this.props.update(this.props.index, expense)
	},
	delete: function(e) {
    e.preventDefault()
    this.props.delete(this.props.expense, this.props.index)
  },
  removePredictions: function(e) {
		this.setState({predictions: []})
  },
	render: function() {
		let expense = this.props.expense
		return (
			<form onSubmit={this.save} data-abide>
				<div className='row'>
				  <div className="large-2 large-offset-1 medium-offset-1 medium-2 columns">
				  	<label>Date</label>
				  	<InputField type='text' name='date' readOnly placeholder='2015-07-01' onChange={this.update.bind(this, expense)} value={expense.date} className='get-date' errors={expense.errors} />
				  </div>
				  <div className="large-2 medium-2 columns">
				  	<label>Name</label>
				  	<InputField type='text' onBlur={this.removePredictions} name='name' placeholder='(Rent Payment)' onChange={this.update.bind(this, expense)} value={expense.name} className='expense-item-field' errors={expense.errors} />
				  	<PredictedExpenses select={this.select} predictions={this.state.predictions} />
				  </div>
				  <div className="large-2 medium-2 columns">
				  	<label>Amount</label>
				  	<InputField type='number' name='amount' placeholder='0.00' onChange={this.update.bind(this, expense)} value={numberToCurrency(expense.amount,'')} step='any' min='0.00' className='expense-item-field' errors={expense.errors} />
				  </div>
				  <div className='large-2 medium-2 columns'>
				    <ul className="button-group radius even-2">
              <li><input type='submit' title='Save' className='tiny success radius button' value='save' /></li>
              <li><a href='#' onClick={this.delete} title='Remove this expense' className='tiny alert radius button'>delete</a></li>
            </ul>
				  </div>
				  <div className='large-3 medium-3 columns'></div>
				</div>
			</form>
		)
	}
});


