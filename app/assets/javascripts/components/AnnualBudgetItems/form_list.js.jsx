var AnnualBudgetFormList = React.createClass({
	forms: function() {
		return (this.props.annual_budget_items.map((budget_item, index) => {
      return (
        <AnnualBudgetItemForm openModal={this.props.openModal}
											        index={index}
											        budgetItem={budget_item}
											        key={index}
											        updateForm={this.props.updateForm}
											        saveForm={this.props.saveForm}
											        delete={this.props.delete} />
      )
    }))
	},
  render: function() {
    return (
    	<div>
	    	<h4>Manage Budget Items</h4>
	      <hr />
	      <div className='row'>
	        <div className='large-4 columns'>Name</div>
	        <div className='large-2 columns'>Amount</div>
	        <div className='large-2 columns'>Due Date</div>
	        <div className='large-1 columns text-center'>Paid?</div>
	        <div className='large-3 columns'></div>
	      </div>

	      <div className='annual-items-forms'>
          {this.forms()}
          <a href='#' onClick={this.props.addItem} className='tiny button radius add-nested-item'><i className='fi-icon fi-plus'></i> Add an Item</a>
        </div>
      </div>
    )
  }
})