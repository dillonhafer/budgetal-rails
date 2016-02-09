import React from 'react';
import {findStatistic} from '../../data/statistic';
import Highchart from '../highchart';
import classNames from 'classnames';
import {
  monthName,
  selectedValue,
  yearOptions,
  monthOptions,
  title
} from '../../utils/helpers';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showForm: false,
    budget: {
      month: this.props.params.month,
      year: this.props.params.year,
      budget_categories: []
    }
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
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

    this.context.history.push(`/monthly-statistics/${year}/${month}`)
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
    this._fetchBudget(this.props.params);
  }

  _fetchDataDone = (budget) => {
    this.setState({budget});
    title(this.title());
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
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
      .then((resp) => {
        this._fetchDataDone(resp.budget)
      })
      .catch(this._fetchDataFail)
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

  title() {
    var month = monthName(this.props.params.month);
    return `${month} ${this.props.params.year}`
  }

  incrementMonth = (date, number) => {
    var year     = date.getFullYear();
    var month    = date.getMonth();
    var newMonth = month + number;
    return new Date(year, newMonth);
  }

  changeMonth = (number) => {
    var currentDate = new Date(this.props.params.year, this.props.params.month-1, 1);
    var newDate = this.incrementMonth(currentDate, number);
    var date = {year: newDate.getFullYear(), month: newDate.getMonth() + 1}
    this.context.history.push(`/monthly-statistics/${date.year}/${date.month}`)
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
            {this.title()}
            <a href='#' onClick={this.showForm} title='Change Budget' className='right black-color copy-category'>
              <i className="fi-icon fi-calendar"></i>
            </a>
            <span className={formClasses}>
              <p className='text-center size-12'>
                <i onClick={this.changeMonth.bind(null,-1)} className='fi-arrow-left size-16'></i>
                Change Budget
                <i onClick={this.changeMonth.bind(null,1)} className='fi-arrow-right size-16'></i>
              </p>
              <p>
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
