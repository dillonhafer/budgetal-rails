var Statistics = React.createClass({
  getInitialState: function() {
    return {
      didFetchData: false,
      showForm: false,
      budget: {
        month: this.monthParam(),
        year: this.yearParam(),
        budget_categories: []
      }
    }
  },
  pathNames: function() {
    return window.location.pathname.split('/')
  },
  yearParam() {
    var yearIndex = this.pathNames().length - 2
    return this.pathNames()[yearIndex]
  },
  monthParam() {
    var yearIndex = this.pathNames().length - 1
    return this.pathNames()[yearIndex]
  },
  changeBudget: function(e) {
    var year  = selectedValue('#budget_year')
    var month = selectedValue('#budget_month')

    document.title = `${monthName(month)} ${year} | Budgetal`;
    history.pushState({}, 'Budgetal', `/monthly-statistics/${year}/${month}`)
    this._fetchBudget({year: year, month: month})
    this.setState({showForm: false})
  },
  hideForm: function(e) {
    e.preventDefault()
    this.setState({showForm: false})
  },
  showForm: function(e) {
    e.preventDefault()
    this.setState({showForm: true})
  },
  componentDidMount: function() {
    this._fetchBudget({year: this.yearParam(), month: this.monthParam()})
  },
  _fetchDataDone(data, textStatus, jqXHR) {
    console.log(data.budget.month)
    console.log(data)
    this.setState({
      didFetchData: true,
      budget: data.budget
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
    StatisticsController.find(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  },
  statistics: function() {
    if (this.state.budget.id) {
      return <StatsChart selector='stats-container' budget_categories={this.state.budget.budget_categories} />
    } else {
      return this.missing()
    }
  },
  missing: function() {
    return (
      <div id="greeting" className="text-center animated">
        <h2>Uh-oh!</h2>
        <p>It looks like you don't have a budget for this month</p>
      </div>
    )
  },
  fullMonth: function() {
    return monthName(this.monthParam())
  },
  render: function() {
    let formClasses = classNames({
      'tooltip annual-budget-tooltip animate': true,
      fadeInUpBig2: this.state.showForm,
      hide: !this.state.showForm
    });
    let budget = this.state.budget
    return (
      <div className='row collapse'>
        <div className='large-12 columns header-row'>
          <h3>
            {this.fullMonth()} {this.yearParam()}
            <a href='#' onClick={this.showForm} title='Change Budget' className='right black-color copy-category'>
              <i className="fi-icon fi-calendar"></i>
            </a>
            <span className={formClasses}>
              <p>
                <label htmlFor="budget_month">Change Budget</label>
                <select id="budget_month" name='budget_month' onBlur={this.hideForm} value={budget.month} onChange={this.changeBudget}>
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
                <select id="budget_year" name='budget_year' onBlur={this.hideForm} value={budget.year} onChange={this.changeBudget}>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                </select>
              </p>
            </span>
          </h3>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories">
            <li>
              {this.statistics()}
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
