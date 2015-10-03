var BudgetItem = React.createClass({
	propTypes: {
    budgetItem: React.PropTypes.object.isRequired,
    openModal: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  },
	getInitialState: function() {
		return {
			hideExpenses: true
		}
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
	toggleExpenses: function(e) {
		e.preventDefault();
		if (this.props.budgetItem.budget_item_expenses) {
			this.setState({hideExpenses: !this.state.hideExpenses});
		}
	},
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
				    	<InputField onChange={this.update.bind(this, item)} type='text' name='name' placeholder='Name' value={item.name} error={this.errorsFor('name')} />
				    </div>
				    <div className="large-2 medium-2 columns text-right budget-item-amount-spent">
				      {numberToCurrency(item.amount_spent)}
				    </div>
				    <div className="large-2 medium-2 columns text-right budget-item-amount-budgeted">
					    <InputField onChange={this.update.bind(this, item)} type='number' name='amount_budgeted' step='any' min='0.00' required placeholder='0.00' value={numberToCurrency(item.amount_budgeted,'')} error={this.errorsFor('amount_budgeted')} />
				    </div>
				    <div className="large-1 medium-1 columns text-right">
			        <span className={this.remainingClass()}>{numberToCurrency(item.amount_remaining)}</span>
				    </div>
				    <div className='large-2 medium-2 columns'>
					    <ul className="button-group radius even-2">
	              <li><input type='submit' title='Save' className='tiny success radius button' value='save' /></li>
	              <li><a href='#' onClick={this._delete} title='Remove this item' className='tiny alert radius button'>delete</a></li>
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