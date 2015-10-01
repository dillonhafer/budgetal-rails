var CategoryList = React.createClass({
  changeCategory: function(e) {
    e.preventDefault()
    var id = e.target.dataset.id
    this.props.changeCategory(id);
  },
	render: function() {
    var self = this;
		return (
			<div className='large-2 medium-2 hide-for-small-down columns category-list'>
        <div className="icon-bar vertical six-up label-right">
          <a className='item header text-center' href='#'>
            <label><i className='fi-calendar'></i> {monthName(this.props.budget.month)} {this.props.budget.year}</label>
          </a>
          <span className='tooltip'>
            <p>
              <label htmlFor="month_change_budget_2i">Change Budget</label>
              <select id="budget_month" name='budget_month'  onChange={this.changeYear}>
								<option value="1">January</option>
								<option value="2">February</option>
								<option value="3">March</option>
								<option value="4">April</option>
								<option value="5">May</option>
								<option value="6">June</option>
								<option value="7">July</option>
								<option value="8">August</option>
								<option value="9">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
              </select>
              <select id="budget_year" name='budget_year' onChange={this.changeYear}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
              </select>
            </p>
          </span>
          {
            this.props.budget.budget_categories.map((category, index) => {
              var categoryClass = 'sidebar-'+category.name.toLowerCase().replace('/','-')
              var classes = classNames({
                'item droppable-category': true,
                'active': category.id === self.props.currentCategoryId
              }, categoryClass);
              return (
                <a key={index} data-id={category.id} onClick={self.changeCategory} href="#" className={classes}>
                  <label>{category.name}</label>
                </a>
              );
            })
          }
        </div>
      </div>
		)
	}
})