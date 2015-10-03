var BudgetItemList = React.createClass({
  propTypes: {
    budgetItems: React.PropTypes.array.isRequired,
    addBudgetItem: React.PropTypes.func.isRequired,
    saveBudgetItem: React.PropTypes.func.isRequired,
    updateBudgetItem: React.PropTypes.func.isRequired,
    deleteBudgetItem: React.PropTypes.func.isRequired
  },
	budgetItems: function() {
		return (this.props.budgetItems.map((budget_item, index) => {
      return (
        <BudgetItem index={index}
        						key={index}
						        budgetItem={budget_item}
        						save={this.props.saveBudgetItem}
        						update={this.props.updateBudgetItem}
						        delete={this.props.deleteBudgetItem} />
      )
    }))
	},
	render: function() {
		return (
			<div className="row new-budget-item">
			 {this.budgetItems()}
				<a href='#' onClick={this.props.addBudgetItem} className='add-item-link tiny button radius success'>Add a budget item</a>
			</div>
		)
	}
})
