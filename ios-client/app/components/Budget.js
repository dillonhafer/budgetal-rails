import React, {Component} from 'react'
import {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import DatePickerWithAccessory from '../utils/DatePickerWithAccessory';
import {findCategory} from '../data/budget_category';
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
});

class Budgets extends Component {
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

  updateBudget = (json) => {
    var ds = this.state.dataSource;
    this.setState({dataSource: ds.cloneWithRows(json.budget.budget_categories)});
  }

  componentDidMount() {
    this._updateList(this.props.budget.year,this.props.budget.month)
  }

  _updateList = async (year,month) => {
    try {
      let resp = await findCategory({year,month});
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
      <TouchableHighlight key={rowID} onPress={this._pressRow.bind(this,budgetCategory.id)} underlayColor='#6699ff'>
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

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.budgetCategories)
    const dateManagerProps = {
      beginningYear: 2015,
      endingYear: new Date().getFullYear()+2,
      year: this.props.budget.year,
      month: this.props.budget.month,
    }

    return (
      <View style={styles.container}>
        <DateBar onDateChange={this.onDateChange}
                 toggleDatePicker={this.toggleDatePicker}
                 {...dateManagerProps} />

        <ListView style={styles.list}
                  initialListSize={12}
                  scrollsToTop={this.props.scrollsToTop}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={dataSource}
                  renderSeparator={this.separator}
                  renderRow={this._renderRow} />

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 type='year-month'
                                 onDone={this.toggleDatePicker}
                                 onValueChange={this.onDateChange}
                                 {...dateManagerProps} />
      </View>
    )
  }
}

module.exports = Budgets;
