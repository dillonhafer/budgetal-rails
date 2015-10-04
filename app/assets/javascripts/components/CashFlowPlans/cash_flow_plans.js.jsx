var CashFlowPlan = React.createClass({
  getInitialState: function() {
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
  componentDidMount: function() {
    this._fetchBudget({year: this.yearParam(), month: this.monthParam(), id: this.props.id})
  },
  changeCategory: function(id) {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  },
  successMessage: function(item_name) {
    showMessage(`Updated ${item_name}`)
  },
  _fetchBudget(data) {
    BudgetCategoryController.find(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  },
  saveBudgetItem: function(item) {
    var data = {
      budget_category_id: this.state.category.id,
      budget_item: item
    }
    if (item.id === undefined) {
      BudgetItemController.create(data)
        .done(this._budgetItemSaved.bind(null, item.index))
        .fail(this._saveItemFail.bind(null, item))
    } else {
      BudgetItemController.update(item)
        .done(this._budgetItemSaved.bind(null, item.index))
        .fail(this._saveItemFail.bind(null, item))
    }
  },
  _budgetItemSaved(index, budget_item, err) {
    let category = this.state.category
    budget_item.budget_item_expenses = category.budget_items[index].budget_item_expenses

    category.budget_items[index] = budget_item
    this.setState({category: category})
    showMessage(`Saved ${budget_item.name}`)
  },
  _saveItemFail(index, xhr, status, err) {
    let errors = JSON.parse(xhr.responseText).errors
    let category = this.state.category
    _.where(category.budget_items, {'id': index.id})[0].errors = errors

    this.setState({category: category})
  },
  deleteBudgetItem: function(e) {
    e.preventDefault();
    if (this.state.modal.budget_item.id !== undefined) {
      BudgetItemController.destroy(this.state.modal.budget_item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.budget_item))
    }
  },
  _budgetItemDeleted(index) {
    let category = this.state.category
    category.budget_items.splice(index, 1)
    if (this.state.modal.budget_item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.budget_item.name)
    }
    this.setState({category: category})
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
  addBudgetItem(e) {
    e.preventDefault()
    var category = this.state.category
    category.budget_items.push({category_id: category.id})
    this.setState({category: category})
  },
  updateBudgetItem: function(index, updatedBudgetItem) {
    var category = this.state.category
    category.budget_items[index] = updatedBudgetItem
    this.setState({category: category})
  },
  updateBudget: function(budget) {
    let current = this.state.budget
    current.monthly_income = budget.monthly_income
    this.setState({budget: budget})
  },
  saveBudget: function(budget) {
    BudgetController.update(budget)
      .done(this._budgetUpdated)
      .fail(this._saveBudgetFail.bind(null, budget))
  },
  _saveBudgetFail: function(index, xhr, status, err) {
    let errors = JSON.parse(xhr.responseText).errors
    let budget = this.state.budget
    budget.errors = errors
    this.setState({budget: budget})
  },
  _budgetUpdated: function(xhr, status, err) {
    this.setState({budget: xhr.budget})
  },
  render: function() {
    return (
      <section>
        <CategoryList budget={this.state.budget} changeBudget={this.changeBudget} currentCategoryId={this.state.category.id} changeCategory={this.changeCategory} />

        <div className='large-10 medium-10 columns hide-for-small-down'>
          <div>
            <Category addBudgetItem={this.addBudgetItem}
                      saveBudgetItem={this.saveBudgetItem}
                      updateBudgetItem={this.updateBudgetItem}
                      deleteBudgetItem={this.confirmDelete}
                      category={this.state.category} />

            <div className='row collapse overviews'>
              <CategoryOverview category={this.state.category} />
              <Overview budget={this.state.budget} updateBudget={this.updateBudget} saveBudget={this.saveBudget} />
            </div>
            <ImportModal category={this.state.category} />
          </div>
        </div>
        <Confirm name={this.state.modal.budget_item.name}
                 hidden={this.state.modal.hidden}
                 cancel={this.cancelDelete}
                 delete={this.deleteBudgetItem} />
      </section>
    );
  }
});
