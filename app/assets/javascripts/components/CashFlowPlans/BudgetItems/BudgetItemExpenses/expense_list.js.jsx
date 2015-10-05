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
	expenses: function() {
		if (this.props.expenses.length) {
			return (this.props.expenses.map((expense, index) => {
	      return (
	        <Expense index={index}
							     key={index}
							     expense={expense}
	      					 save={this.props.functions.save}
	      					 update={this.props.functions.update}
						       delete={this.props.functions.delete} />
	      )
	    }))
		} else {
			return(<p className='text-center'>You haven't added any expenses yet</p>)
		}
	},
	render: function() {
		return (
			<div className={this.props.className}>
				<div className="fields">{this.expenses()}</div>
			  <a href='#' onClick={this.add} className='add-expense-link tiny button radius yellow'>Add an expense</a>
		    <hr />
			</div>
		)
	}
})
