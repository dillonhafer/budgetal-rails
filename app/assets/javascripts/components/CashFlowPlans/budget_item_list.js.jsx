var BudgetItemList = React.createClass({
	budgetItems: function() {
		return (this.props.budgetItems.map((budget_item, index) => {
      return (
        <BudgetItem index={index}
						        budgetItem={budget_item}
						        key={index} />
      )
    }))
	},
	render: function() {
		return (
			<div className="row new-budget-item">
			 {this.budgetItems()}
				<a href='#new_budget_item_path' className='add-item-link tiny button radius success'>Add a budget item</a>
			</div>
		)
	}
})
