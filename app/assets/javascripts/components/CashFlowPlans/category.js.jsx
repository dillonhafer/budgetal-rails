var Category = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired,
    expenseFunctions: React.PropTypes.object.isRequired,
    itemFunctions: React.PropTypes.object.isRequired
  },
	render: function() {
    var headerClasses = classNames('row', 'type-labels', {
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
	          <a href='#category_copy_path' title='Import items from previous budget' className='right black-color copy-category'>
		          <i className="fi-icon fi-download"></i>
	          </a>
          </h3>
        </div>
        <div className="small-12 large-12 medium-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className={headerClasses}>
                <div className="large-2 medium-2 large-offset-5 medium-offset-5 columns text-right">
                  Spent
                </div>
                <div className="large-2 medium-2 columns text-right">
                  Budgeted
                </div>
                <div className="large-3 medium-3 columns">
                  Difference
                </div>
              </div>
              <br />
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