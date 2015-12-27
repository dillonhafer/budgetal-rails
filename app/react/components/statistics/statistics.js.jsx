import React from 'react';
import {findStatistic} from '../../data/statistic';
import Highchart from '../highchart';
import classNames from 'classnames';
import {monthName, selectedValue, urlParams, yearOptions, monthOptions} from '../../utils/helpers';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    didFetchData: false,
    showForm: false,
    budget: {
      month: urlParams().month,
      year: urlParams().year,
      budget_categories: []
    }
  }

  chartData(categories) {
    return _.map(categories, function(category) {
             return {y: parseFloat(category.percent_spent), name: category.name}
           })
  }

  chartConfig(data) {
    var categories = this.state.budget.budget_categories;
    return {
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
      },
      series: [{data}]
    };
  }

  changeBudget = (e) => {
    var year  = selectedValue('#budget_year')
    var month = selectedValue('#budget_month')

    document.title = `${monthName(month)} ${year} | Budgetal`;
    history.pushState({}, 'Budgetal', `/monthly-statistics/${year}/${month}`)
    this._fetchBudget({year: year, month: month})
    this.setState({showForm: false})
  }

  hideForm = (e) => {
    e.preventDefault()
    this.setState({showForm: false})
  }

  showForm = (e) => {
    e.preventDefault()
    this.setState({showForm: true})
  }

  componentDidMount() {
    this._fetchBudget({year: urlParams().year, month: urlParams().month})
  }

  _fetchDataDone = (data, textStatus, jqXHR) => {
    this.setState({
      didFetchData: true,
      budget: data.budget
    })
  }

  _fetchDataFail(xhr, status, err) {
    var errors = JSON.parse(xhr.responseText).errors
    for (idx in errors) {
      var msg = errors[idx]
      showMessage(msg)
    }
  }

  changeCategory(id) {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  }

  _fetchBudget(data) {
    findStatistic(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  }

  statistics() {
    if (this.state.budget.id) {
      var data   = this.chartData(this.state.budget.budget_categories);
      var config = this.chartConfig(data);
      return <Highchart config={config} />
    } else {
      return this.missing()
    }
  }

  missing() {
    return (
      <div id="greeting" className="text-center animated">
        <h2>Uh-oh!</h2>
        <p>It looks like you don't have a budget for this month</p>
      </div>
    )
  }

  fullMonth() {
    return monthName(urlParams().month)
  }

  render() {
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
            {this.fullMonth()} {urlParams().year}
            <a href='#' onClick={this.showForm} title='Change Budget' className='right black-color copy-category'>
              <i className="fi-icon fi-calendar"></i>
            </a>
            <span className={formClasses}>
              <p>
                <label htmlFor="budget_month">Change Budget</label>
                <select id="budget_month" value={budget.month} onBlur={this.hideForm} onChange={this.changeBudget}>{monthOptions()}</select>
                <select id="budget_year" value={budget.year} onBlur={this.hideForm} onChange={this.changeBudget}>{yearOptions()}</select>
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
}
