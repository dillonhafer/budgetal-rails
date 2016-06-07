'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} = React;

const styles = StyleSheet.create({
  addButtonContainer: {
    paddingTop: 35,
    flex: 1,
    alignItems: 'center'
  },
  addButton: {
    color: '#69F',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#69F',
    width: 180,
    padding: 4,
    paddingTop: 8
  },
  header: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 4
  },
  instructions: {
    textAlign: 'left',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  list: {
    backgroundColor: '#FFF',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: '#FFF',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
  },
  paid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row'
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
  },
  rightYear: {
    alignItems: 'flex-end'
  },
  leftYear: {
    textAlign: 'left',
  },
  logo: {
    height: 64,
    width: 64,
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
    padding: 4
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderBottomColor: '#DDD'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
    marginTop: 4
  },
});

var h = require('../../../../Utils/ViewHelpers');
const Swipeout = require('react-native-swipeout');
import {alert, confirm}   from '../../../../Utils/window';

var BudgetItemExpense = React.createClass({
  propTypes: {
    onDeleteExpense: React.PropTypes.func.isRequired,
    budgetItem: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      budget_item: {
        budget_item_expenses: []
      },
      budgetItemExpenses: ds.cloneWithRows([]),
    }
  },
  swipeoutBtns(expense) {
    const confirmText = `Are you sure you want to delete\n\n${expense.name}\n\nThis cannot be undone.`;
    return [
      {
        text: 'Edit',
        color: 'white',
        backgroundColor: '#69F'
      },
      {
        text: 'Delete',
        color: 'white',
        backgroundColor: '#f04124',
        onPress: () => {
          confirm('Confirm Delete', confirmText, this.props.onDeleteExpense.bind(this, expense))
        }
      },
      {text: 'Cancel', color: '#555'}
    ];
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
    console.log(this.props.budgetItem)
    this.updateBudgetItemExpenses(this.props.budgetItem)
  },
  _renderRow: function(expense, sectionID, rowID) {
    return (
      <Swipeout right={this.swipeoutBtns(expense)} autoClose={true} key={rowID}>
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
      </Swipeout>
    );
  },
  ds() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let ex = this.props.budgetItem.budget_item_expenses;
    return ds.cloneWithRows(ex);
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Expenses</Text>
        </View>

        <ListView style={styles.list}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.ds()}
                  renderRow={this._renderRow}
                  renderFooter={this.addButton} />
      </View>
    )
  }
})

module.exports = BudgetItemExpense;
