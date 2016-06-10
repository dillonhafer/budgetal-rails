import React, {Component} from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

import {groupBy} from 'lodash-node'
import {BLUE,RED,GRAY_BORDER,GRAY_BACKGROUND,GRAY_SEPARATOR,GRAY,WHITE,DARK_TITLE} from '../constants/Colors'
import {numberToCurrency} from '../Utils/ViewHelpers'
import {confirm}   from '../Utils/window';
import {deleteItemExpense} from '../Data/budgetItemExpense'

const styles = StyleSheet.create({
  addButtonContainer: {
    paddingTop: 35,
    paddingBottom: 35,
    flex: 1,
    alignItems: 'center',
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
    color: DARK_TITLE,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  list: {
    backgroundColor: WHITE,
    flex: 1
  },
  expenseRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: DARK_TITLE,
    fontWeight: 'bold',
    padding: 8
  },
  amount: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: GRAY,
  },
  separator: {
    height: 1,
    backgroundColor: GRAY_SEPARATOR,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: GRAY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: WHITE,
    borderBottomColor: GRAY_BORDER
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: GRAY,
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
  section: {
    backgroundColor: GRAY_BACKGROUND,
    padding: 5,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY_BORDER,
    borderTopWidth: 0.5,
    borderTopColor: GRAY_BORDER,
  },
  sectionTitle: {
    color: GRAY,
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
      <View key={rowID}>
        <View style={styles.expenseRow}>
          <Text style={styles.title}>{expense.name}</Text>
          <Text style={styles.amount}>{numberToCurrency(expense.amount)}</Text>
        </View>
        {this.crudButtons(expense)}
      </View>
    );
  }

  separator(sectionID, rowID) {
    return <View key={`expense-${rowID}`} style={styles.separator} />
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

  getRowData(data, sectionId, rowId) {
    return data[sectionId][rowId];
  }

  render() {
    const ds = new ListView.DataSource({
      getRowData: this.getRowData,
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

        <ListView style={styles.list}
                  scrollsToTop={this.props.scrollsToTop}
                  enableEmptySections={true}
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
