var AnnualBudget = React.createClass({
  getInitialState() {
    return {
      didFetchData: false,
      showForm: false,
      budget: {
        year: '',
        annual_budget_items: []
      }
    }
  },
  componentDidMount() {
    this._fetchBudget({year: this.yearParam()})
  },
  successMessage(item_name) {
    showMessage("Updated "+item_name)
  },
  _fetchBudget(data) {
    AnnualBudgetItemController.all(data)
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
        .fail(this._fetchDataFail)
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
    for (idx in errors) {
      var msg = errors[idx]
      showMessage(msg)
    }
  },
  _deleteBudgetItem(data) {
    if (data.annual_budget_item.id === undefined) {
      this._budgetItemDeleted(data.index, data.annual_budget_item, null)
    } else {
      AnnualBudgetItemController.destroy(data.annual_budget_item)
        .done(this._budgetItemDeleted(null, data.index))
        .fail(this._fetchDataFail.bind(null, data.annual_budget_item))
    }
  },
  _budgetItemDeleted(index, budgetItem, err) {
    let budget = this.state.budget
    budget.annual_budget_items.splice(index, 1)
    if (budgetItem.id !== undefined) {
      showMessage("Deleted "+budgetItem.name)
    }
    this.setState({budget: budget})
  },
  _fetchDataDone(data, textStatus, jqXHR) {
    this.setState({
      didFetchData: true,
      budget: data
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
    var yearIndex = pathNames.length - 1
    return pathNames[yearIndex]
  },
  changeYear() {
    var s = document.querySelector('#annual_budget_year')
    var year = s.options[s.selectedIndex].value;
    history.pushState({}, 'Budgetal', year)
    this._fetchBudget({year: year})
    this.setState({showForm: false})
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
  render: function() {
    let formClasses = classNames({
      'tooltip annual-budget-tooltip animate': true,
      fadeInUpBig2: this.state.showForm,
      hide: !this.state.showForm
    });
    return (
      <div>
        <div className='large-12 columns header-row'>
          <h3>
            Annual Budget for {this.state.budget.year}
            <a href='#' onClick={this.showForm} className='right black-color'><i className='fi-icon fi-calendar'></i></a>
          </h3>
          <span className={formClasses}>
            <p>
              <label htmlFor="annual_budget_year">Change Budget Year</label>
              <select id="annual_budget_year" name='annual_budget_year' value={this.state.budget.year} onChange={this.changeYear}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
              </select>
            </p>
          </span>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories main-annual-budget">
            <li>
              <div className='annual-items-status'>
                <ul className='large-block-grid-4'>
                  {
                    this.state.budget.annual_budget_items.map((budget_item, index) => {
                      return (
                        <AnnualBudgetItem budgetItem={budget_item} key={index} />
                      )
                    })
                  }
                </ul>
              </div>

              <h4>Manage Budget Items</h4>
              <hr />
              <div className='row'>
                <div className='large-4 columns'>Name</div>
                <div className='large-2 columns'>Amount</div>
                <div className='large-2 columns'>Due Date</div>
                <div className='large-1 columns text-center'>Paid?</div>
                <div className='large-3 columns'></div>
              </div>

              <div className='annual-items-forms'>
                {
                  this.state.budget.annual_budget_items.map((budget_item, index) => {
                    return (
                      <AnnualBudgetItemForm index={index} budgetItem={budget_item} key={index} updateForm={this.updateForm} saveForm={this._saveBudgetItem} deleteForm={this._deleteBudgetItem} />
                    )
                  })
                }
                <a href='#' onClick={this.addItem} className='tiny button radius add-nested-item'>Add Item</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
