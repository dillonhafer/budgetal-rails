var Expense = React.createClass({
	errorsFor: function(field_name) {
    var message = ''
    var errors = this.props.expense.errors
    if (errors !== undefined && errors[field_name] != undefined) {
      var err = errors[field_name].toString().replace('_', ' ')
      message = `${field_name.capitalize()} ${err}`
    }
    return message
  },
	render: function() {
		return (
			<form data-abide>
				<div className="row" style={{paddingTop: '15px'}}>
				  <div className="large-3 medium-3 large-offset-1 medium-offset-1 columns">
				  	<InputField type='text' name='date' readOnly placeholder='2015-07-01' value={this.props.expense.date} className='get-date' error={this.errorsFor('date')} />
				  </div>
				  <div className="large-4 medium-4 columns">
				  	<InputField type='text' name='name' placeholder='(Rent Payment)' value={this.props.expense.name} className='expense-item-field' error={this.errorsFor('name')} />
				  </div>
				  <div className="large-2 medium-2 columns">
				  	<InputField type='number' name='amount' placeholder='0.00' value={numberToCurrency(this.props.expense.amount,'')} step='any' min='0.00' className='expense-item-field' error={this.errorsFor('amount')} />
				  </div>
				  <div className='large-2 medium-2 columns centered'>
				  	<a href='#' title='Remove this expense' className='tiny alert round button remove_nested_fields'>×</a>
				  </div>
				</div>
			</form>
		)
	}
});


