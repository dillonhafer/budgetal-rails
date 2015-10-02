var CashFlowPlan = React.createClass({
  getInitialState() {
    return {
      didFetchData: false,
      showForm: false,
      budget: {
        budget_categories: []
      },
      category: {
        id: '',
        name: '',
        amount: '',
        budget_items: []
      },
      modal: {
        hidden: true,
        budget_item: {name: ''},
        index: -1
      }
    }
  },
  confirmDelete: function(budget_item, index) {
    if (!!budget_item.id) {
      this.setState({modal: {hidden: false, budget_item: budget_item, index: index}});
    } else {
      this._budgetItemDeleted(index)
    }
  },
  cancelDelete: function(e) {
    if (e) {
      e.preventDefault()
    }
    this.setState({modal: {hidden: true, index: -1, budget_item: {name: ''}}});
  },
  componentDidMount() {
    this._fetchBudget({year: this.yearParam(), month: this.monthParam(), id: this.props.id})
  },
  changeCategory: function(id) {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  },
  successMessage(item_name) {
    showMessage("Updated "+item_name)
  },
  _fetchBudget(data) {
    BudgetCategoryController.find(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  },
  _saveBudgetItem(data) {
    if (data.annual_budget_item.id === undefined) {
      AnnualBudgetItemController.create(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.annual_budget_item))
    } else {
      AnnualBudgetItemController.update(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.annual_budget_item))
    }
  },
  _budgetItemSaved(index, budget_item, err) {
    let budget = this.state.budget
    budget.annual_budget_items[index] = budget_item
    this.setState({budget: budget})
    showMessage("Saved "+budget_item.name)
  },
  _saveItemFail(index, xhr, status, err) {
    var errors = JSON.parse(xhr.responseText).errors
    let budget = this.state.budget
    for(idx in budget.annual_budget_items) {
      budget_item = budget.annual_budget_items[idx]
      if (budget_item.id == index.id) {
        budget.annual_budget_items[idx].errors = errors
      }
    }
    this.setState({budget: budget})
  },
  _deleteBudgetItem(e) {
    e.preventDefault();
    if (this.state.modal.budget_item.id !== undefined) {
      AnnualBudgetItemController.destroy(this.state.modal.budget_item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.budget_item))
    }
  },
  _budgetItemDeleted(index) {
    let budget = this.state.budget
    budget.annual_budget_items.splice(index, 1)
    if (this.state.modal.budget_item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.budget_item.name)
    }
    this.setState({budget: budget})
    this.cancelDelete()
  },
  _fetchDataDone(data, textStatus, jqXHR) {
    this.setState({
      didFetchData: true,
      budget: data.budget,
      category: data.budget_category
    })
  },
  _fetchDataFail(xhr, status, err) {
    var errors = JSON.parse(xhr.responseText).errors
    for (idx in errors) {
      var msg = errors[idx]
      showMessage(msg)
    }
  },
  yearParam() {
    var pathNames = window.location.pathname.split('/')
    var yearIndex = pathNames.length - 2
    return pathNames[yearIndex]
  },
  monthParam() {
    var pathNames = window.location.pathname.split('/')
    var yearIndex = pathNames.length - 1
    return pathNames[yearIndex]
  },
  changeBudget: function() {
    var year  = selectedValue('#budget_year')
    var month = selectedValue('#budget_month')

    document.title = `${monthName(month)} ${year} | Budgetal`;
    history.pushState({}, 'Budgetal', `/cash-flow-plans/${year}/${month}`)
    this._fetchBudget({year: year, month: month})
  },
  showForm(e) {
    e.preventDefault()
    this.setState({showForm: true})
  },
  addItem(e) {
    e.preventDefault()
    var budget = this.state.budget
    budget.annual_budget_items.push({annual_budget_id: budget.id})
    this.setState({budget: budget})
  },
  updateForm(index, updatedBudgetItem) {
    this.state.budget.annual_budget_items[index] = updatedBudgetItem
    this.setState({budget: this.state.budget})
  },
  updateBudget: function(budget) {
    var current = this.state.budget
    current.monthly_income = budget.monthly_income
    this.setState({budget: current})
  },
  saveBudget: function(budget) {
    BudgetController.update(budget)
      .done(this._budgetUpdated.bind(this, budget))
  },
  _budgetUpdated: function(index, xhr, status, err) {
    var budget = xhr.budget
    budget.budget_categories = this.state.budget.budget_categories
    this.setState({budget: budget})
  },
  render: function() {
    return (
      <section>
        <CategoryList budget={this.state.budget} changeBudget={this.changeBudget} currentCategoryId={this.state.category.id} changeCategory={this.changeCategory} />

        <div className='large-10 medium-10 columns hide-for-small-down'>
          <div className='category-ajax'>
            <Category category={this.state.category} />

            <div className='row collapse overviews'>
              <CategoryOverview category={this.state.category} />
              <Overview budget={this.state.budget} updateBudget={this.updateBudget} saveBudget={this.saveBudget} />
            </div>

            <div className='reveal-modal tiny' id='copy-modal' data-reveal>
              <h2 className='text-center'>Import</h2>
              <hr />
              <p>Do you want to import budget items from your previous month's  c.name  category?</p>
              <div>
                link_to 'Import',
                            category_copy_path(c),
                            class: 'button radius small expand'
              </div>
              <a className="close-reveal-modal" aria-label="Close">&#215;</a>
            </div>
          </div>
        </div>
        <Confirm name={this.state.modal.budget_item.name}
                 hidden={this.state.modal.hidden}
                 cancel={this.cancelDelete}
                 delete={this._deleteBudgetItem} />
      </section>
    );
  }
});
