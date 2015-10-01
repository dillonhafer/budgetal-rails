var ExpenseList = React.createClass({
	expenses: function() {
		return (this.props.expenses.map((expense, index) => {
      return (
        <Expense index={index}
						     expense={expense}
						     key={index} />
      )
    }))
	},
	render: function() {
		return (
			<div className="fields">
			 {this.expenses()}
			</div>
		)
	}
})
