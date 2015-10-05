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
        item: {name: ''},
        index: -1,
        delete: function(){}
      }
    }
  },
  confirmItemDelete: function(budget_item, index) {
    if (!!budget_item.id) {
      this.setState({modal: {hidden: false, item: budget_item, index: index, delete: this.deleteBudgetItem}});
    } else {
      this._budgetItemDeleted(index)
    }
  },
  confirmExpenseDelete: function(expense, index) {
    if (!!expense.id) {
      this.setState({modal: {hidden: false, item: expense, index: index, delete: this.deleteExpense}});
    } else {
      this._expenseDeleted(expense.budget_item_id, index)
    }
  },
  cancelDelete: function(e) {
    if (e) { e.preventDefault() }
    this.setState({modal: {hidden: true, index: -1, item: {name: ''}, delete: function(){}}});
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
  showForm: function(e) {
    e.preventDefault()
    this.setState({showForm: true})
  },
  componentDidMount: function() {
    this._fetchBudget({year: this.yearParam(), month: this.monthParam(), id: this.props.id})
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
  changeCategory: function(id) {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  },
  _fetchBudget(data) {
    BudgetCategoryController.find(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  },
  // Budget Item functions
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
    let budget_item = _.where(category.budget_items, {'id': index.budget_item_id})[0]
    _.where(budget_item.budget_item_expenses, {'index': index.index})[0].errors = errors
    this.setState({category: category})
  },
  deleteBudgetItem: function(e) {
    e.preventDefault();
    if (this.state.modal.item.id !== undefined) {
      BudgetItemController.destroy(this.state.modal.item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.item))
    }
  },
  _budgetItemDeleted(index) {
    let category = this.state.category
    category.budget_items.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  },
  addBudgetItem: function(e) {
    e.preventDefault()
    var category = this.state.category
    category.budget_items.push({category_id: category.id, amount_budgeted: 0.00})
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
  // Budget Item Expense functions
  addExpense: function(id) {
    var category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': id})[0]
    budget_item.budget_item_expenses.push({budget_item_id: id, amount: 0.00})
    this.setState({category: category})
  },
  saveExpense: function(expense) {
    if (expense.id === undefined) {
      ExpenseController.create(expense)
        .done(this._expenseSaved.bind(null, expense.index))
        .fail(this._saveItemFail.bind(null, expense))
    } else {
      ExpenseController.update(expense)
        .done(this._expenseSaved.bind(null, expense.index))
        .fail(this._saveItemFail.bind(null, expense))
    }
  },
  _expenseSaved(index, expense, err) {
    let category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': expense.budget_item_id})[0]
    budget_item.budget_item_expenses[index] = expense
    this.setState({category: category})
    showMessage(`Saved ${expense.name}`)
  },
  updateExpense: function(index, updatedExpense) {
    var category    = this.state.category
    var budget_item = _.where(category.budget_items, {'id': updatedExpense.budget_item_id})[0]
    budget_item.budget_item_expenses[index] = updatedExpense
    this.setState({category: category})
  },
  deleteExpense: function(e) {
    e.preventDefault();
    if (this.state.modal.item.id !== undefined) {
      ExpenseController.destroy(this.state.modal.item.id)
        .done(this._expenseDeleted(this.state.modal.item.budget_item_id, this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.item))
    }
  },
  _expenseDeleted(budget_item_id, index) {
    let category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': budget_item_id})[0]
    budget_item.budget_item_expenses.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  },
  itemFunctions: function() {
    return {
      add: this.addBudgetItem,
      save: this.saveBudgetItem,
      update: this.updateBudgetItem,
      delete: this.confirmItemDelete
    }
  },
  expenseFunctions: function() {
    return {
      add: this.addExpense,
      save: this.saveExpense,
      update: this.updateExpense,
      delete: this.confirmExpenseDelete
    }
  },
  render: function() {
    return (
      <section>
        <CategoryList budget={this.state.budget} changeBudget={this.changeBudget} currentCategoryId={this.state.category.id} changeCategory={this.changeCategory} />

        <div className='large-10 medium-10 columns hide-for-small-down'>
          <div>
            <Category expenseFunctions={this.expenseFunctions()}
                      itemFunctions={this.itemFunctions()}
                      category={this.state.category} />

            <div className='row collapse overviews'>
              <CategoryOverview category={this.state.category} />
              <Overview budget={this.state.budget} updateBudget={this.updateBudget} saveBudget={this.saveBudget} />
            </div>
            <ImportModal category={this.state.category} />
          </div>
        </div>
        <Confirm name={this.state.modal.item.name}
                 hidden={this.state.modal.hidden}
                 cancel={this.cancelDelete}
                 delete={this.state.modal.delete} />
      </section>
    );
  }
});
