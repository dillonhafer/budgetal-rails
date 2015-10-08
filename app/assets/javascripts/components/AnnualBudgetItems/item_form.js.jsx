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
    if (!this.props.budgetItem.id || confirm(this.message())) {
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
  _delete: function(e) {
    e.preventDefault()
    this.props.delete(this.props.budgetItem, this.props.index)
  },
  render: function() {
    let item = this.props.budgetItem
    return (
      <form onSubmit={this.saveItem} data-abide>
        <div className='row'>
          <div className='large-4 columns'>
            <InputField type='text' name='name' onChange={this.updateForm} value={item.name} placeholder='Name' errors={item.errors} />
          </div>
          <div className='large-2 columns'>
            <InputField type="number" name='amount' onChange={this.updateForm} value={numberToCurrency(item.amount, '')} step='any' min='0.00' placeholder='0.00' errors={item.errors} />
          </div>
          <div className='large-2 columns'>
            <InputField type='text' name='due_date' readOnly onChange={this.updateForm} placeholder='2015-07-01' value={item.due_date} className='get-date' errors={item.errors} />
          </div>
          <div className='large-1 columns text-center'>
            <input type='checkbox' name='paid' onChange={this.updateForm} defaultChecked={item.paid} />
          </div>
          <div className='large-3 columns'>
            <button type='submit' title='Save Item' className='tiny success radius button'><i className='fi-icon fi-check'></i> Save</button>
            &nbsp;
            <a href='#' onClick={this._delete} title='Delete Item' className='tiny alert radius button'><i className='fi-icon fi-trash'></i> Delete</a>
          </div>
        </div>
      </form>
    )
  }
});
