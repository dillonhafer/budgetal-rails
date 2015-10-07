var ExpenseList = React.createClass({
  propTypes: {
    expenses: React.PropTypes.array.isRequired,
    functions: React.PropTypes.object.isRequired
  },
	getDefaultProps: function() {
		return {
			expenses: []
		}
	},
	add: function(e) {
		e.preventDefault();
		this.props.functions.add(this.props.budgetItemId);
	},
	headerRow: function() {
		if (this.props.expenses.length) {
			return (
				<div className='row expense-header-row'>
				  <div className="large-2 medium-2 columns"><label>Date</label></div>
				  <div className="large-2 medium-2 columns"><label>Name</label></div>
				  <div className="large-2 medium-2 columns"><label>Amount</label></div>
				  <div className='large-6 medium-6 columns'></div>
				</div>
			)
		}
	},
	expenses: function() {
		if (this.props.expenses.length) {
			return (
				_.map(this.props.expenses, (expense, index) => {
		      return (
		        <Expense index={index}
								     key={index}
								     expense={expense}
		      					 save={this.props.functions.save}
		      					 update={this.props.functions.update}
							       delete={this.props.functions.delete} />
		      )}
	      )
      )
		} else {
			return(<p className='no-expenses'>You haven't added any expenses yet</p>)
		}
	},
	render: function() {
		return (
			<div className={this.props.className}>
				<div className="fields">
					{this.headerRow()}
					{this.expenses()}
				  <div className='add-expense-link-row'><a href='#' onClick={this.add} className='add-expense-link tiny button radius yellow'>Add an expense</a></div>
				</div>
			</div>
		)
	}
})
