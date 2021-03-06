import React, {Component} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
const SwipeableListViewDataSource = require('SwipeableListViewDataSource');
import SwipeableListView from 'SwipeableListView';

import {groupBy} from 'lodash-node'
import {numberToCurrency} from '../utils/ViewHelpers'
import {deleteItemExpense} from '../data/budgetItemExpense'

import ConfirmDeleteButton from './ConfirmDeleteButton';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
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
  header: {
    fontSize: 18,
    color: '$darkTitle',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '$white'
  },
  list: {
    backgroundColor: '$white',
    flex: 1
  },
  expenseRow: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '$darkTitle',
    fontWeight: 'bold',
    padding: 8
  },
  amount: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '$gray',
  },
  separator: {
    height: 1,
    backgroundColor: '$graySeparator',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '$grayBackground',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '$white',
    borderBottomColor: '$grayBorder'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '$gray',
    marginTop: 4
  },
  crudContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '$white',
  },
  button: {
    height: 110,
    width: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '$blue',
  },
  editButtonText: {
    color: '$white',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '$grayBackground',
    padding: 5,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '$grayBorder',
    borderTopWidth: 0.5,
    borderTopColor: '$grayBorder',
  },
  sectionTitle: {
    color: '$gray',
    fontWeight: '900',
  }
});

class BudgetItem extends Component {
  constructor(props) {
    super(props)
  }

  addButton = () => {
    const budget_item_id = this.props.budgetItem ? this.props.budgetItem.id : 0;
    const budgetItemExpense = {budget_item_id};
    return (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={this.props.addBudgetItemExpense.bind(this,budgetItemExpense)}>
          <Text style={styles.addButton}>+ Add an expense</Text>
        </TouchableOpacity>
      </View>
    )
  }

  crudButtons = (expense) => {
    return (
      <View style={styles.crudContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={this.props.editBudgetItemExpense.bind(this,expense)}
          underlayColor='blue' >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <ConfirmDeleteButton name={expense.name}
                             deleteFunction={this.deleteExpense.bind(this, expense)} />
      </View>
    )
  }

  deleteExpense = async(expense) => {
    try {
      const resp = await deleteItemExpense(expense.id);
      if (resp.success) {
        this.props.deleteBudgetItemExpense(expense);
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  _renderExpenseRow = (expense, sectionID, rowID) => {
    return (
      <TouchableHighlight key={`expense-row-${sectionID}-${rowID}`}>
        <View style={styles.expenseRow}>
          <Text style={styles.title}>{expense.name}</Text>
          <Text style={styles.amount}>{numberToCurrency(expense.amount)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  separator(sectionID, rowID) {
    return <View key={`expense-${sectionID}-${rowID}`} style={styles.separator} />
  }

  renderSectionHeader(sectionData: string, sectionID: string) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {sectionData.name}
        </Text>
      </View>
    );
  }

  getSectionData(data, sectionId) {
    const [y,m,d] = sectionId.split('-');
    return {name: new Date(y,m-1,d,1,1,1,1).toDateString()};
  }

  render() {
    let ds = new SwipeableListViewDataSource({
      getRowData: (data, sId, rId) => data[sId][rId],
      getSectionHeaderData: this.getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    const dataBlob = groupBy(this.props.budgetItemExpenses, 'date')
    const budgetItemExpenses = ds.cloneWithRowsAndSections(dataBlob);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Expenses</Text>
        </View>

        <SwipeableListView style={styles.list}
                  bounceFirstRowOnMount={true}
                  maxSwipeDistance={200}
                  renderQuickActions={this.crudButtons}
                  scrollsToTop={this.props.scrollsToTop}
                  enableEmptySections={true}
                  initialListSize={this.props.budgetItemExpenses.length+1}
                  automaticallyAdjustContentInsets={false}
                  dataSource={budgetItemExpenses}
                  renderRow={this._renderExpenseRow}
                  renderSectionHeader={this.renderSectionHeader}
                  renderFooter={this.addButton}
                  renderSeparator={this.separator} />
      </View>
    )
  }
}

module.exports = BudgetItem;
