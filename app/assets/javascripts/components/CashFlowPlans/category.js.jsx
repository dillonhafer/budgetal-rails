var Category = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired,
    expenseFunctions: React.PropTypes.object.isRequired,
    itemFunctions: React.PropTypes.object.isRequired,
    import: React.PropTypes.func.isRequired
  },
	render: function() {
    var headerClasses = classNames('row', 'budget-item-labels', {
      hide: this.props.category.budget_items.length === 0
    });
    var messageClasses = classNames('text-center', {
      hide: this.props.category.budget_items.length !== 0
    });
		return (
			<div className='row collapse'>
        <div className='large-12 medium-12 columns header-row'>
          <h3>
	          {this.props.category.name}
	          <a href='#' onClick={this.props.import} title='Import items from previous budget' className='right black-color copy-category'>
		          <i className="fi-icon fi-download"></i>
	          </a>
          </h3>
        </div>
        <div className="small-12 large-12 medium-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className={headerClasses}>
                <div className="large-1 medium-1 large-offset-4 medium-offset-4 columns text-right">
                  Spent
                </div>
                <div className="large-2 medium-2 columns text-right">
                  Budgeted
                </div>
                <div className="large-1 medium-1 columns">
                  Difference
                </div>
                <div className="large-4 medium-4 columns"></div>
              </div>
              <p className={messageClasses}>You haven't added any budget items yet.</p>
            	<BudgetItemList functions={this.props.itemFunctions}
                              expenseFunctions={this.props.expenseFunctions}
                              budgetItems={this.props.category.budget_items} />
            </li>
          </ul>
        </div>
      </div>
		)
	}
})