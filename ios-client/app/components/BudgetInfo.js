import React, {Component} from 'react'
import {
  Dimensions,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native'

import {find} from '../data/Budgets';
import {numberToCurrency, monthName} from '../utils/ViewHelpers';
import StyleSheet from './StyleSheet';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width, height,
    backgroundColor: '$white',
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '$grayBackground',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '$white',
    borderBottomColor: '$grayBorder',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '$gray',
  },
});

class BudgetInfo extends Component {
  componentDidMount() {
    this._updateBudget()
  }

  _updateBudget = async() => {
    try {
      const budget = await find(this.props.budget.year, this.props.budget.month)
      if (budget !== null) {
        this.props.updateBudget(budget)
      }
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{monthName(this.props.budget.month-1)} {this.props.budget.year}</Text>
        </View>
        <ScrollView>
          <View style={styles.scrollView}>
            <Text>Monthly Income: {numberToCurrency(this.props.budget.monthly_income)}</Text>
            <Text>Budgeted: {numberToCurrency(this.props.budget.budgeted)}</Text>
            <Text>You have {numberToCurrency(this.props.budget.not_budgeted)} remaining to budget</Text>
            <Text>Spent: {numberToCurrency(this.props.budget.spent)}</Text>
            <Text>Remaining: {numberToCurrency(this.props.budget.remaining)}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

module.exports = BudgetInfo;
