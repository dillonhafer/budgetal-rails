var AnnualBudgetItemForm = React.createClass({
  message() {
    let message = `Are you sure you want to delete ${this.props.budgetItem.name}?
          This cannot be undone.`
    return message
  },
  updateForm(e) {
    var newValue = (e.target.name === 'paid') ? e.target.checked : e.target.value
    this.props.budgetItem[e.target.name] = newValue
    this.props.updateForm(this.props.index, this.props.budgetItem)
  },
  deleteItem(e) {
    e.preventDefault()
    if (this.props.budgetItem.id === undefined || confirm(this.message())) {
      this.props.deleteForm({
        annual_budget_item: this.props.budgetItem,
        index: this.props.index
      })
    }
  },
  saveItem(e) {
    e.preventDefault()
    this.props.saveForm({
      annual_budget_item: this.props.budgetItem,
      index: this.props.index
    })
  },
  paid: function() {
    var text = this.props.budgetItem.paid ? 'Paid' : 'Not Paid'
    var css  = 'label radius '
    css += this.props.budgetItem.paid ? 'success' : 'alert'
    return (<span className={css}>{text}</span>)
  },
  errorsFor(field_name) {
    var message = ''
    var errors = this.props.budgetItem.errors
    if (errors !== undefined && errors[field_name] != undefined) {
      var err = errors[field_name].toString().replace('_', ' ')
      message = `${field_name.capitalize()} ${err}`
    }
    return message
  },
  render: function() {
    return (
      <form data-abide>
        <div className='row'>
          <div className='large-4 columns'>
            <InputField type='text' name='name' onChange={this.updateForm} value={this.props.budgetItem.name} placeholder='Name' error={this.errorsFor('name')} />
          </div>
          <div className='large-2 columns'>
            <InputField type="number" name='amount' onChange={this.updateForm} value={numberToCurrency(this.props.budgetItem.amount, '')} step='any' min='0.00' placeholder='0.00' error={this.errorsFor('amount')} />
          </div>
          <div className='large-2 columns'>
            <InputField type='text' name='due_date' onChange={this.updateForm} placeholder='2015-07-01' value={this.props.budgetItem.due_date} className='get-date' error={this.errorsFor('due_date')} />
          </div>
          <div className='large-1 columns text-center'>
            <input type='checkbox' name='paid' onChange={this.updateForm} defaultChecked={this.props.budgetItem.paid} />
          </div>
          <div className='large-3 columns'>
            <ul className="button-group radius even-2">
              <li><a href='#' onClick={this.saveItem} title='Save this item' className='tiny success radius button'>save</a></li>
              <li><a href='#' onClick={this.deleteItem} title='Remove this item' className='tiny alert radius button'>delete</a></li>
            </ul>
          </div>
        </div>
      </form>
    )
  }
});
