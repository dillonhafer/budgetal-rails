var BudgetItem = React.createClass({
	remainingClass: function() {
		var item = this.props.budgetItem;
		return classNames({
      'success-color': item.amount_remaining > 0,
      'alert-color': item.amount_remaining < 0,
      'blue': item.amount_remaining == 0
    });
	},
	errorsFor: function(field_name) {
    var message = ''
    var errors = this.props.budgetItem.errors
    if (errors !== undefined && errors[field_name] != undefined) {
      var err = errors[field_name].toString().replace('_', ' ')
      message = `${field_name.capitalize()} ${err}`
    }
    return message
  },
	render: function() {
		var item = this.props.budgetItem;
		return (
			<div className='budget-item-form- bi.id %> draggable-budget-item'>
			  <div className='row'>
				  <form data-abide>
				    <div className="large-1 medium-1 columns centered">
				      <a href='javascript:void(0)' className='show-expenses'><i className='fi-list-bullet blue-color move-cursor'></i></a>
				    </div>
				    <div className="large-4 medium-4 columns">
				    	<InputField type='text' name='name' placeholder='Name' value={item.name} error={this.errorsFor('name')} />
				    </div>
				    <div className="large-2 medium-2 columns text-right">
				      {numberToCurrency(item.amount_spent)}
				    </div>
				    <div className="large-2 medium-2 columns text-right">
					    <InputField type='number' name='amount_budgeted' step='any' min='0.00' required placeholder='0.00' value={numberToCurrency(item.amount,'')} error={this.errorsFor('amount_budgeted')} />
				    </div>
				    <div className="large-1 medium-1 columns text-right">
			        <span className={this.remainingClass()}>{numberToCurrency(item.amount_remaining)}</span>
				    </div>
				    <div className='large-2 medium-2 columns centered'>
				    	<input type='submit' title='Save' className='tiny success round button circle-button' value='✓' />
				      <a href='#' className='tiny alert round button circle-button' title='Delete'>×</a>
				    </div>
			    </form>
			  </div>
			  <div className="expense-list hide">
			    <ExpenseList expenses={item.budget_item_expenses} />
			    <a href='#' className='tiny button radius yellow add-nested-item'>Add an expense</a>
			    <hr />
			  </div>
			  <ul data-dropdown-content className="f-dropdown"></ul>
      </div>
		)
	}
});