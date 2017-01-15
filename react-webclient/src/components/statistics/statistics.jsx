import React from 'react';
import {browserHistory} from 'react-router';
import {findStatistic} from '../../data/statistic';
import Highchart from '../highchart';
import classNames from 'classnames';
import {
  monthName,
  selectedValue,
  yearOptions,
  monthOptions,
  title,
  numberToCurrency
} from '../../utils/helpers';

import {
  Col,
  Row,
  DatePicker,
  Icon,
  Popover,
} from 'antd';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      budget: {
        month: this.props.params.month,
        year: this.props.params.year,
        budget_categories: []
      }
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
      plotOptions: {pie: {showInLegend: false}},
      series: [{data}]
    };
  }

  changeBudget = (e) => {
    var year  = selectedValue('#budget_year')
    var month = selectedValue('#budget_month')

    browserHistory.push(`/monthly-statistics/${year}/${month}`)
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
    title(`${this.title()} | Statistics`);
    this._fetchBudget(this.props.params);
  }

  _fetchDataDone = (budget) => {
    this.setState({budget});
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
      const colors = ['#fc121e',
                      '#fd8dd7',
                      '#fd9226',
                      '#1a98fc',
                      '#fc2a1c',
                      '#935211',
                      '#0a5591',
                      '#fed37f',
                      '#1a98fc',
                      '#929292',
                      '#fd9226',
                      '#5e5e5e']

      const data   = this.chartData(this.state.budget.budget_categories);
      const config = this.chartConfig(data);
      return <Highchart config={config} colors={colors} />
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
    browserHistory.push(`/monthly-statistics/${date.year}/${date.month}`)
  }

  handleOnChange = (date, dateString) => {
    browserHistory.push(`/monthly-statistics/${date.year()}/${date.month()+1}`);
  }

  findDisabledDate(date) {
    const year = date.year();
    return (year < 2015 || year > 2018) ? true : false;
  }

  handleVisibleChange = (showForm) => {
    this.setState({showForm});
  }

  render() {
    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <div className='header-row'>
            <h3>
              {this.title()}
              <Popover
                content={
                  <DatePicker.MonthPicker onChange={this.handleOnChange} disabledDate={this.findDisabledDate} />
                }
                title="Change Date"
                placement="leftTop"
                trigger="click"
                visible={this.state.showForm}
                onVisibleChange={this.handleVisibleChange}>
                <a href="#" onClick={this.showForm} className="right">
                  <Icon type="calendar" />
                </a>
              </Popover>
            </h3>
          </div>
          <div className="body-row">
            <Row>
              <Col span={12}>
                {this.statistics()}
              </Col>
              <Col span={12}>
                <ul className='stat-list'>
                {
                  this.state.budget.budget_categories.map((category, key) => {
                    const statIconClass = 'stat-icon stat-icon-'+category.name.toLowerCase().replace('/','-')
                    return (
                      <li key={key}>
                        <div className='stat-list-item'>
                          <div className={statIconClass} />
                          <b>{category.name}</b><br />
                          <span className='percentSpent'>
                            {numberToCurrency(category.amount_spent)} - %{parseInt(category.percent_spent)}
                          </span>
                        </div>
                      </li>
                    )
                  })
                }
                </ul>
              </Col>
            </Row>
            <br style={{clear: 'both'}} />
          </div>
        </Col>
      </Row>
    );
  }
}
