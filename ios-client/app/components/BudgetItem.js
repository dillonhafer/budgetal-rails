import React, {Component} from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

import {BLUE,RED,GRAY_BORDER,GRAY_BACKGROUND,GRAY_SEPARATOR,GRAY,WHITE,DARK_TITLE} from '../constants/Colors'

const styles = StyleSheet.create({
  addButtonContainer: {
    paddingTop: 35,
    flex: 1,
    alignItems: 'center'
  },
  addButton: {
    color: BLUE,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: BLUE,
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
    backgroundColor: WHITE
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
    backgroundColor: WHITE,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: WHITE,
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
    borderColor: WHITE,
    borderBottomColor: '#DDD'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
    marginTop: 4
  },

  crudContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: WHITE,
  },
  button: {
    width: 100,
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  editButton: {
    borderColor: BLUE,
  },
  editButtonText: {
    color: BLUE,
    textAlign: 'center',
  },
  deleteButton: {
    borderColor: RED,
  },
  deleteButtonText: {
    color: RED,
    textAlign: 'center',
  },

});

var h = require('../Utils/ViewHelpers');
import {alert, confirm}   from '../Utils/window';
import {deleteItemExpense} from '../Data/budgetItemExpense'

class BudgetItem extends Component {
  constructor(props) {
    super(props)
  }

  addButton = () => {
    const budget_item_id = this.props.budgetItem ? this.props.budgetItem.id : 0;
    let budgetItemExpense = {budget_item_id};
    return (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={this.props.addBudgetItemExpense.bind(this,budgetItemExpense)}>
          <Text style={styles.addButton}>+ Add an expense</Text>
        </TouchableOpacity>
      </View>
    )
  }

  crudButtons = (expense) => {
    const confirmText = `Are you sure you want to delete\n\n${expense.name}\n\nThis cannot be undone.`;
    return (
      <View style={styles.crudContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={this.props.editBudgetItemExpense.bind(this,expense)}
          underlayColor='#EEE' >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            confirm('Confirm Delete', confirmText, this.deleteExpense.bind(this, expense))
          }}
          underlayColor='#EEE' >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    )
  }

  deleteExpense = async(expense) => {
    try {
      let resp = await deleteItemExpense(expense.id);
      if (resp.success) {
        this.props.deleteBudgetItemExpense(expense);
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  _renderExpenseRow = (expense, sectionID, rowID) => {
    return (
        <View key={rowID}>
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
          {this.crudButtons(expense)}
          <View style={styles.separator} />
        </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let budgetItemExpenses = ds.cloneWithRows(this.props.budgetItemExpenses);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Expenses</Text>
        </View>

        <ListView style={styles.list}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={budgetItemExpenses}
                  renderRow={this._renderExpenseRow}
                  renderFooter={this.addButton} />
      </View>
    )
  }
}

module.exports = BudgetItem;
