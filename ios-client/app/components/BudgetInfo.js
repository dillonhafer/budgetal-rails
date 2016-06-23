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
  editButton: {
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
  meterContainer: {
    width,
    paddingTop: 2,
    paddingBottom: 2,
  },
  meterAmountContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  spent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  remaining: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  spentText: {
    textAlign: 'center',
    color: '$green',
  },
  remainingText: {
    textAlign: 'center',
    color: '$blue',
  },
  meter: {
    width: width - 10,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: '$clear',
    backgroundColor: '$grayBackground',
    height: 25,
    margin: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  meterProgress: {
    height: 20,
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: '$clear',
    backgroundColor: '$blue',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressPercent: {
    textAlign: 'center',
    color: '$white',
    justifyContent: 'center',
  },
  amount: {
    fontWeight: 'bold',
    margin: 2,
  },
  editText: {
    marginTop: 5,
    fontSize: 10,
    color: '$blue',
  }
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

  getPercent(spent, budgeted) {
    const p = spent / budgeted * 100;
    return p > 99 ? 100 : parseInt(p);
  }

  getProgressWidth(width, percent) {
    return width * (percent / 100)
  }

  render() {
    const percent = this.getPercent(this.props.budget.spent, this.props.budget.budgeted)
    const progressWidth = this.getProgressWidth(width-10, percent)
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{monthName(this.props.budget.month-1)} {this.props.budget.year}</Text>
        </View>
        <ScrollView>
          <View style={styles.scrollView}>

            <View style={styles.meterContainer}>
              <View style={styles.meterAmountContainer}>
                <View style={styles.spent}>
                  <Text style={styles.spentText}>Spent</Text>
                  <Text style={styles.spentText}>{numberToCurrency(this.props.budget.spent)}</Text>
                </View>
                <View style={styles.remaining}>
                  <Text style={styles.remainingText}>Remaining</Text>
                  <Text style={styles.remainingText}>{numberToCurrency(this.props.budget.remaining)}</Text>
                </View>
              </View>
              <View style={styles.meter}>
                <View style={[styles.meterProgress, {width: progressWidth}]}>
                  <Text style={styles.progressPercent}>{ (percent > 9) ? `${percent}%` : ''}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={()=>{}}>
              <Text>You have</Text>
              <Text style={styles.amount}>{numberToCurrency(this.props.budget.not_budgeted)}</Text>
              <Text>out of</Text>
              <Text style={styles.amount}>{numberToCurrency(this.props.budget.monthly_income)}</Text>
              <Text>remaining to budget</Text>
              <Text style={styles.editText}>(tap to edit)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

module.exports = BudgetInfo;
