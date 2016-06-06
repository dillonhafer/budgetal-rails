import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native'

import DatePickerWithAccessory from '../../Utils/DatePickerWithAccessory';
import {findCategory} from '../../Data/budget_category';
import {numberToCurrency, categoryIcon} from '../../Utils/ViewHelpers';
import DateBar from '../../components/DateBar';

var styles = require("./styles");

class Budgets extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      budgetDate: new Date(),
      showDatePicker: false,
      budget_category: {
        budget_categories: []
      },
      dataSource: ds.cloneWithRows([]),
    }
  }

  parseDatePieces(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1
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
    this._updateList(new Date())
  }

  _updateList = async (date) => {
    try {
      const params = this.parseDatePieces(date)
      let budget_category = await findCategory(params);
      if (budget_category !== null)
        this.setState({budgetDate: date})
        this.updateBudget(budget_category)
    } catch(error) {
      this.props.signOut(error)
    }
  }

  onDateChange = (budgetDate) => {
    this.setState({budgetDate})
    this._updateList(budgetDate)
  }

  _pressRow = async (id) => {
    let params = this.parseDatePieces(this.state.budgetDate);
    params.id = id;

    try {
      let resp = await findCategory(params);
      if (resp !== null) {
        this.props.showBudgetCategory(resp.budget_category);
      }
    } catch (err) {
      // this.props.signOut();
    }
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
    let currentDate = this.state.budgetDate;
    return (
      <View style={styles.container}>
        <DateBar date={currentDate}
                 onDateChange={this._updateList}
                 toggleDatePicker={this.toggleDatePicker} />

        <ListView style={styles.list}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.dataSource}
                  renderSeparator={this.separator}
                  renderRow={this._renderRow} />

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.toggleDatePicker}
                                 date={currentDate}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
}

module.exports = Budgets;
