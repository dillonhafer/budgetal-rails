var CategoryOverview = React.createClass({
	budgeted: function() {
		var items = this.props.category.budget_items
		return items.reduce(function(previousItem, currentItem, index, array) {
		  return parseFloat(previousItem) + parseFloat(currentItem.amount_budgeted);
		}, 0.00);
	},
	getDefaultProps: function() {
		return {
			monthlyIncome: 0.00
		}
	},
	percentOfBudget: function() {
		return parseInt(this.budgeted() / this.props.monthlyIncome * 100);
	},
	remaining: function() {
		return this.budgeted() - this.spent()
	},
	spent: function() {
		var expenses = []
		this.props.category.budget_items.map((budget_item, index) => {
			if (budget_item.budget_item_expenses) {
	      budget_item.budget_item_expenses.map((expense) => {
	      	expenses.push(expense)
	      })
		  }
    })

		return expenses.reduce(function(previousExpense, currentExpense, index, array) {
		  return parseFloat(previousExpense) + parseFloat(currentExpense.amount);
		}, 0.00);
	},
	percentSpent: function() {
		var p = this.spent() / this.budgeted() * 100;
		if (isNaN(p)) {
			return 0
		} else if (p > 99) {
			return 100
		} else {
			return parseInt(p)
		}
	},
	meterWidth: function() {
		var width = `${this.percentSpent()}%`
		return {
			width: width
		}
	},
	meterClasses: function() {
		return classNames({
      'meter': true,
      'red-meter': this.percentSpent() > 99
    });
	},
	remainingClasses: function() {
		return classNames({
      'right remaining': true,
      'alert-color': this.remaining() < 0,
      'blue-color': this.remaining() > 0
    });
	},
	render: function() {
		return (
			<div className='large-5 medium-5 columns'>
        <div className='header-row'>
          <h3>{this.props.category.name} Overview</h3>
        </div>
        <div className='category-overview'>
          <ul>
			      <li>
	            <span className='spent success-color'>
	              Spent: {numberToCurrency(this.spent())}
	            </span>
	            <span className={this.remainingClasses()}>
	              Remaining: {numberToCurrency(this.remaining())}
	            </span>
	            <div className="progress radius" title={this.percentSpent()+'%'}>
	              <span className={this.meterClasses()} style={this.meterWidth()}></span>
	            </div>
			        <hr />
			        <p>
			          You have budgeted {numberToCurrency(this.budgeted())} ({this.percentOfBudget()}%) towards {this.props.category.name}, we recommend you only budget {this.props.category.percentage}.
			        </p>
			        <Chart selector='category-overview' spent={this.percentSpent()} remaining={100 - this.percentSpent()} />
			      </li>
			    </ul>
        </div>
      </div>
		)
	}
})