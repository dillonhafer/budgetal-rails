import React, {Component} from 'react'
import {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native'

import {allPlans} from '../data/DetailedBudgets';
import {numberToCurrency, categoryIcon} from '../utils/ViewHelpers';
import DateBar from './DateBar';
import {find} from 'lodash-node';
import StyleSheet from './StyleSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  list: {
    backgroundColor: '$backgroundColor',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: '$backgroundColor',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '$graySeparator',
  },
  logo: {
    height: 64,
    width: 64,
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    color: '$darkTitle',
    fontWeight: 'bold',
    padding: 4
  },
  emptyText: {
    padding: 40,
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
  },
  allocationPlanButton: {
    padding: 40,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    margin: 40,
  },
  planButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '$darkTitle',
  },
  addButtonContainer: {
    paddingTop: 35,
    paddingBottom: 35,
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    color: '$blue',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '$blue',
    width: 180,
    padding: 4,
    paddingTop: 8
  },
});

class DetailedBudget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
    }
  }

  toggleDatePicker = () => {
    var status = this.state.showDatePicker
    this.setState({showDatePicker: !status})
  }

  componentDidMount() {
    this._updateList(this.props.budget.year,this.props.budget.month)
  }

  _updateList = async (year,month) => {
    try {
      let resp = await allPlans({year,month});
      if (resp !== null)
        this.props.updateBudget(resp.budget)
    } catch(error) {
      this.props.signOut(error)
    }
  }

  onDateChange = (year, month) => {
    this.props.updateBudgetDate(year,month)
    this._updateList(year,month)
  }

  _pressRow = (id) => {
    let budgetCategory = find(this.props.budgetCategories, {id});
    this.props.showBudgetCategory(budgetCategory);
  }

  _renderRow = (budgetCategory: string, sectionID: number, rowID: number) => {
    let imageSource = categoryIcon(budgetCategory.name);
    return (
      <TouchableHighlight
        key={rowID}
        onPress={this._pressRow.bind(this,budgetCategory.id)}
        underlayColor='#6699ff'
        accessible={true}
        accessibilityLabel={`${budgetCategory.name} Category`}>
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Image style={styles.logo} source={imageSource} />
            </View>
            <View style={styles.right}>
              <View style={styles.paid}>
                <Text style={styles.title}>
                  {budgetCategory.name}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={styles.subTitle}>
                  Spent: {numberToCurrency(budgetCategory.amount_spent)}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={styles.subTitle}>
                  Remaining: {numberToCurrency(budgetCategory.amount_remaining)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  separator(sectionID, rowID) {
    if (parseInt(rowID) < 11) {
      return <View key={`separator-${rowID}`} style={styles.separator} />
    }
  }

  _getEmptyMessage() {
  }

  _getFooter = (isEmpty) => {
    const budget_category_id = this.props.budgetCategory ? this.props.budgetCategory.id : 0;
    let newBudgetItem = {budget_category_id};
    const emptyText = "You haven't added any pay periods yet.";
    const emptyMessage = isEmpty ? null : <Text style={styles.emptyText}>{emptyText}</Text>
    return (
      <View style={styles.addButtonContainer}>
        {emptyMessage}
        <TouchableOpacity
          onPress={this.props.addBudgetItem}
          accessible={true}
          accessibilityLabel={`Add Pay Period`}>
          <Text style={styles.addButton}>+ Add a pay period</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _getPlans(plans) {
    return plans.map((plan, index) => {
      const text = `Pay period from\n${plan.tab_date}`
      return (
        <TouchableHighlight onPress={()=>{}}
                            style={styles.allocationPlanButton}
                            key={`allocation-plan-${index}`}>
          <Text style={styles.planButtonText}>{text}</Text>
        </TouchableHighlight>
      )
    })
  }

  render() {
    const plans = this.props.allocation_plans;
    return (
      <View style={styles.container}>
        <DateBar onDateChange={this.onDateChange}
                 toggleDatePicker={this.toggleDatePicker}
                 showDatePicker={this.state.showDatePicker}
                 type='year-month'
                 beginningYear={2015}
                 endingYear={new Date().getFullYear()+2}
                 year={this.props.budget.year}
                 month={this.props.budget.month} />

        <ScrollView>
          {this._getPlans(plans)}
          {this._getFooter(!!plans.length)}
        </ScrollView>
      </View>
    )
  }
}

module.exports = DetailedBudget;
