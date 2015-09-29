var AnnualBudgetItemList = React.createClass({
	budgetItems: function() {
		if (this.props.annual_budget_items.length > 0) {
			return this.list()
		} else {
			return this.empty();
		}
	},
	empty: function() {
		return (<p className='text-center'>You haven't added any budget items yet.</p>)
	},
	list: function() {
		return (this.props.annual_budget_items.map((budget_item, index) => {
      return (
        <AnnualBudgetItem budgetItem={budget_item} key={index} />
      )
    }))
	},
  render: function() {
    return (
    	<div className='annual-items-status'>
		    <ul className='large-block-grid-4'>
			    {this.budgetItems()}
	      </ul>
      </div>
    )
  }
})