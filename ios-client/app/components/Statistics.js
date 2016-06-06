import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import {map} from 'lodash-node';
import StatisticsRepo from '../Data/StatisticsRepository';
import DateBar from './DateBar';
import DatePickerWithAccessory from '../Utils/DatePickerWithAccessory';
import StatsBar from './StatsBar';
import {WHITE} from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statisticsDate: new Date(),
      showDatePicker: false,
      budget: {
        budget_categories: []
      }
    }
  }

  toggleDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  fetchBudget(data) {
    StatisticsRepo.find(data).done(this.updateStats);
  }

  componentDidMount() {
    this.onDateChange(this.state.statisticsDate);
  }

  onDateChange = (date) => {
    const params = {
      year: date.getFullYear(),
      month: date.getMonth()+1
    };
    this.setState({statisticsDate: date});
    this.fetchBudget(params);
  }

  updateStats = (json) => {
    this.setState({budget: json.budget});
  }

  chart() {
    return map(this.state.budget.budget_categories, function(category, i) {
      return <StatsBar key={i} name={category.name} percentage={category.percent_spent} />
    });
  }

  missing() {
    return (<Text>We could not find statistics for this month!</Text>);
  }

  stats() {
    return this.state.budget.budget_categories.length ? this.chart() : this.missing();
  }

  render() {
    let currentDate = this.state.statisticsDate;
    return (
      <View style={styles.container}>
        <DateBar date={currentDate}
                 onDateChange={this.onDateChange}
                 toggleDatePicker={this.toggleDatePicker} />

        {this.stats()}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.toggleDatePicker}
                                 date={this.state.statisticsDate}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
}

module.exports = Statistics;
