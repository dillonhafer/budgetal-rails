var BudgetItem = React.createClass({
	propTypes: {
    budgetItem: React.PropTypes.object.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  },
	getInitialState: function() {
		return {
			hideExpenses: true
		}
	},
	remaining: function() {
		let item = this.props.budgetItem
		return item.amount_budgeted - item.amount_spent
	},
	update: function(item,e) {
		item[e.target.name] = e.target.value
		this.props.update(this.props.index, item)
	},
	save: function(e) {
		e.preventDefault()
		var item = this.props.budgetItem
		item.index = this.props.index
		this.props.save(this.props.budgetItem)
	},
	delete: function(e) {
    e.preventDefault()
    this.props.delete(this.props.budgetItem, this.props.index)
  },
	toggleExpenses: function(e) {
		e.preventDefault();
		if (this.props.budgetItem.budget_item_expenses) {
			this.setState({hideExpenses: !this.state.hideExpenses});
		}
	},
	remainingClass: function() {
		var item = this.props.budgetItem;
		return classNames({
      'success-color': this.remaining() > 0,
      'alert-color': this.remaining() < 0,
      'blue': this.remaining() == 0
    });
	},
	render: function() {
		let item = this.props.budgetItem;
		var expensesClasses = classNames('expense-list', {hide: this.state.hideExpenses, fadeIn: !this.state.hideExpenses})
		var toggleClasses = classNames('fi-list-bullet move-cursor', {'blue-color': this.state.hideExpenses, 'alert-color': !this.state.hideExpenses})
		return (
			<div className='budget-item-form- bi.id %> draggable-budget-item'>
			  <div className='row'>
				  <form onSubmit={this.save} data-abide>
				    <div className="large-1 medium-1 columns centered">
				      <a href='#' onClick={this.toggleExpenses} className='show-expenses'><i className={toggleClasses}></i></a>
				    </div>
				    <div className="large-4 medium-4 columns budget-item-name">
				    	<InputField onChange={this.update.bind(this, item)} type='text' name='name' placeholder='Name' value={item.name} errors={item.errors} />
				    </div>
				    <div className="large-2 medium-2 columns text-right budget-item-amount-spent">
				      {numberToCurrency(item.amount_spent)}
				    </div>
				    <div className="large-2 medium-2 columns text-right budget-item-amount-budgeted">
					    <InputField onChange={this.update.bind(this, item)} type='number' name='amount_budgeted' step='any' min='0.00' required placeholder='0.00' value={numberToCurrency(item.amount_budgeted,'')} errors={item.errors} />
				    </div>
				    <div className="large-1 medium-1 columns text-right">
			        <span className={this.remainingClass()}>{numberToCurrency(this.remaining())}</span>
				    </div>
				    <div className='large-2 medium-2 columns'>
					    <ul className="button-group radius even-2">
	              <li><input type='submit' title='Save' className='tiny success radius button' value='save' /></li>
	              <li><a href='#' onClick={this.delete} title='Remove this item' className='tiny alert radius button'>delete</a></li>
	            </ul>
				    </div>
			    </form>
			  </div>
			  <div className={expensesClasses}>
			    <ExpenseList expenses={item.budget_item_expenses} />
			    <a href='#' className='tiny button radius yellow add-nested-item'>Add an expense</a>
			    <hr />
			  </div>
			  <ul data-dropdown-content className="f-dropdown"></ul>
      </div>
		)
	}
});