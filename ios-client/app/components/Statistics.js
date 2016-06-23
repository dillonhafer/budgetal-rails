import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'

import {map} from 'lodash-node';
import {find} from '../data/StatisticsRepository';
import DateBarView from './DateBarView';
import StatsBar from './StatsBar';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  emptyRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '$blue',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
    paddingBottom: 30
  },
});

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
    }
  }

  toggleDatePicker = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  componentDidMount() {
    this._updateList(this.props.budget.year,this.props.budget.month)
  }

  _updateList = async (year,month) => {
    try {
      let resp = await find({year,month});
      if (resp !== null) {
        this.props.updateStats(resp.budget)
      }
    } catch(error) {
      this.props.endSession(error)
    }
  }

  onDateChange = (year, month) => {
    this.props.updateBudgetDate(year,month)
    this._updateList(year,month)
  }

  chart(categories) {
    return map(categories, function(category, i) {
      return <StatsBar key={i} name={category.name} percentage={category.percent_spent} />
    });
  }

  missing() {
    return (
      <View style={styles.emptyRow}>
        <Text style={styles.emptyText}>We could not find statistics for this month!</Text>
      </View>
    );
  }

  stats() {
    const categories = this.props.budgetCategories;
    return categories.length ? this.chart(categories) : this.missing();
  }

  render() {
    return (
      <DateBarView onDateChange={this.onDateChange}
               style={styles.container}
               toggleDatePicker={this.toggleDatePicker}
               showDatePicker={this.state.showDatePicker}
               type='year-month'
               beginningYear={2015}
               endingYear={new Date().getFullYear()+2}
               year={this.props.budget.year}
               month={this.props.budget.month}>
        {this.stats()}
      </DateBarView>
    )
  }
}

module.exports = Statistics;
