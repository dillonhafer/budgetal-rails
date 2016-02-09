'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} = React;

var DatePickerWithAccessory = require('../../Utils/DatePickerWithAccessory');
var BudgetRepo = require('../../Data/BudgetRepository');
var BudgetCategory = require('./BudgetCategory');
var { Icon, } = require('react-native-icons');
var styles = require("./styles");
var h = require('../../Utils/ViewHelpers');

var CashFlowPlans = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      budgetDate: new Date(),
      showDatePicker: false,
      budget_category: {
        budget_categories: []
      },
      dataSource: ds.cloneWithRows([]),
    }
  },
  datePieces: function() {
    return {
      year: this.state.budgetDate.getFullYear(),
      month: this.state.budgetDate.getMonth() + 1
    }
  },
  toggleDatePicker: function() {
    var status = this.state.showDatePicker
    this.setState({showDatePicker: !status})
  },
  updateBudget: function(json) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(json.budget.budget_categories)});
  },
  componentDidMount: function() {
    this._updateList()
  },
  _updateList: function() {
    BudgetRepo.find(this.datePieces())
      .done(this.updateBudget)
  },
  onDateChange: function(date) {
    this.setState({budgetDate: date});
    this._updateList()
  },
  menuDate: function() {
    let month = h.monthName(this.state.budgetDate.getMonth())
    return `${month} ${this.state.budgetDate.getFullYear()}`
  },
  nextMonth: function() {
    var year = this.state.budgetDate.getFullYear()
    var month = this.state.budgetDate.getMonth()
    var newbudgetDate = new Date(year, month+1)
    this.setState({budgetDate: newbudgetDate})
    this._updateList()
  },
  previousMonth: function() {
    var year = this.state.budgetDate.getFullYear()
    var month = this.state.budgetDate.getMonth()
    var newbudgetDate = new Date(year, month-1)
    this.setState({budgetDate: newbudgetDate})
    this._updateList()
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
  backButton: function() {
    return (
      <TouchableOpacity onPress={this.props.navigator.props.popRoute}>
        <View style={styles.navBarLeftButton}>
          <Image style={styles.back} source={require('image!left_icon')} />
        </View>
      </TouchableOpacity>
    );
  },
  _pressRow: function(budgetCategory, date) {
    this.props.navigator.props.pushRouteBack({
      title: budgetCategory.name,
      component: BudgetCategory,
      showMenu: false,
      leftCorner: this.backButton(),
      data: {budget_category: budgetCategory, date: date}
    });
  },
  _renderRow: function(budgetCategory: string, sectionID: number, rowID: number) {
    let imageSource = h.categoryIcon(budgetCategory.name);
    let budgetDate = this.state.budgetDate;
    return (
      <TouchableHighlight onPress={()=>this._pressRow(budgetCategory, budgetDate)} underlayColor='#6699ff'>
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
                  Spent: {h.numberToCurrency(budgetCategory.amount_spent)}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={styles.subTitle}>
                  Remaining: {h.numberToCurrency(budgetCategory.amount_remaining)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
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

        <ListView style={styles.list}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow} />

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.toggleDatePicker}
                                 date={this.state.budgetDate}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
})

module.exports = CashFlowPlans;
