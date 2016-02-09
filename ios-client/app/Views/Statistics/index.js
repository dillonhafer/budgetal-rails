'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LinkingIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var _ = require('lodash-node');
var DatePickerWithAccessory = require('../../Utils/DatePickerWithAccessory');
var StatisticsRepo = require('../../Data/StatisticsRepository');
var { Icon, } = require('react-native-icons');
var styles = require("./styles");
var h = require('../../Utils/ViewHelpers');
var StatsBar = require('./stats_bar')

var Statistics = React.createClass({
  getInitialState: function() {
    return {
      statisticsDate: new Date(),
      showDatePicker: false,
      budget: {
        budget_categories: []
      }
    }
  },
  toggleDatePicker: function() {
    let status = this.state.showDatePicker
    this.setState({showDatePicker: !status})
  },
  fetchBudget: function(data) {
    StatisticsRepo.find(data)
      .done(this.updateStats)
  },
  componentDidMount: function() {
    let date = this.state.statisticsDate
    var data = {year: date.getFullYear(), month: date.getMonth()+1}
    this.fetchBudget(data)
  },
  onDateChange: function(date) {
    var data = {year: date.getFullYear(), month: date.getMonth()+1}
    this.setState({statisticsDate: date});
    this.fetchBudget(data)
  },
  menuDate: function() {
    let month = h.monthName(this.state.statisticsDate.getMonth())
    return `${month} ${this.state.statisticsDate.getFullYear()}`
  },
  updateStats: function(json) {
    this.setState({budget: json.budget})
  },
  chart: function() {
    var cat = this.state.budget.budget_categories[0]
    var stats = ''
    return _.map(this.state.budget.budget_categories, function(category, i) {
      return <StatsBar key={i} name={category.name} percentage={category.percent_spent} />
    });
  },
  missing: function() {
    return <Text>We could not find statistics for this month!</Text>
  },
  stats: function() {
    return this.state.budget.budget_categories.length ? this.chart() : this.missing();
  },
  nextMonth: function() {
    var year = this.state.statisticsDate.getFullYear()
    var month = this.state.statisticsDate.getMonth()
    var newStatisticsDate = new Date(year, month+1)
    this.setState({statisticsDate: newStatisticsDate})
    this.fetchBudget({year: newStatisticsDate.getFullYear(), month: newStatisticsDate.getMonth()+1})
  },
  previousMonth: function() {
    var year = this.state.statisticsDate.getFullYear()
    var month = this.state.statisticsDate.getMonth()
    var newStatisticsDate = new Date(year, month-1)
    this.setState({statisticsDate: newStatisticsDate})
    this.fetchBudget({year: newStatisticsDate.getFullYear(), month: newStatisticsDate.getMonth()+1})
  },
  nextYearButton: function() {
    return (<TouchableHighlight
              style={[styles.rightYear]}
              underlayColor='transparent'
              onPress={this.nextMonth}>
              <Icon name='fontawesome|chevron-right'
                size={24}
                color={'gray'}
                style={styles.icon} />
            </TouchableHighlight>);
  },
  previousYearButton: function() {
    return (<TouchableHighlight
              style={[styles.leftYear]}
              underlayColor='transparent'
              onPress={this.previousMonth}>
              <Icon name='fontawesome|chevron-left'
                size={24}
                color={'gray'}
                style={styles.icon} />
            </TouchableHighlight>);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.yearModifier}>
          {this.previousYearButton()}
          <TouchableHighlight underlayColor='transparent' onPress={this.toggleDatePicker}>
            <Text style={styles.centerYear}>{this.menuDate()}</Text>
          </TouchableHighlight>
          {this.nextYearButton()}
        </View>

        {this.stats()}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.toggleDatePicker}
                                 date={this.state.statisticsDate}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
})

module.exports = Statistics;
