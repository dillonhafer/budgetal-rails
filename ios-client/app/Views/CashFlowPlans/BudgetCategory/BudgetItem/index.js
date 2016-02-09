'use strict';

var React = require('react-native');
var {
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} = React;

var styles = require("./styles");
var h = require('../../../../Utils/ViewHelpers');

var BudgetItemExpense = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      budget_item: {
        budget_item_expenses: []
      },
      budgetItemExpenses: ds.cloneWithRows([]),
    }
  },
  addButton: function() {
    return (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={()=>console.log('add expense')}>
          <Text style={styles.addButton}>+ Add an expense</Text>
        </TouchableOpacity>
      </View>
    )
  },
  updateBudgetItemExpenses: function(budget_item) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({budgetItemExpenses: ds.cloneWithRows(budget_item.budget_item_expenses), budget_item: budget_item});
  },
  componentDidMount: function() {
    this.updateBudgetItemExpenses(this.props.route.data)
  },
  _pressRow: function(budgetCategory) {
    // this.props.navigator.props.pushRouteBack({
    //   title: budgetCategory.name,
    //   component: BudgetCategory,
    //   showMenu: false,
    //   leftCorner: this.backButton(),
    //   data: budgetCategory
    // });
  },
  _renderRow: function(expense: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={()=>this._pressRow(expense)} underlayColor='#6699ff'>
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>
                {expense.name}
              </Text>
            </View>
            <View style={styles.right}>
              <View style={styles.paid}>
                <Text style={{fontWeight: 'bold'}}>Date: </Text>
                <Text style={styles.subTitle}>
                  {expense.date}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={{fontWeight: 'bold'}}>Spent: </Text>
                <Text style={styles.subTitle}>
                  {h.numberToCurrency(expense.amount)}
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
        <ListView style={styles.list}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.budgetItemExpenses}
                  renderRow={this._renderRow}
                  renderFooter={this.addButton} />
      </View>
    )
  }
})

module.exports = BudgetItemExpense;
