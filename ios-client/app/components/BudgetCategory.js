import React, {Component} from 'react'
import {
  Dimensions,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
const {width} = Dimensions.get('window')
const SwipeableListViewDataSource = require('SwipeableListViewDataSource');
import SwipeableListView from 'SwipeableListView';
import Meter from './Meter';
import {reduce,where} from 'lodash-node'
import Icon from 'react-native-vector-icons/FontAwesome';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  addButtonContainer: {
    paddingTop: 35,
    paddingBottom: 35,
    flex: 1,
    alignItems: 'center',
  },
  emptyRow: {
    alignItems: 'center',
    paddingBottom: 45,
  },
  importButtonText: {
    fontWeight: 'bold',
    color: '$green',
    marginLeft: 8,
  },
  importButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '$green',
    borderRadius: 5,
    width: 200,
    padding: 8,
    overflow: 'hidden',
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
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
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
    overflow: 'hidden',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '$blue',
    backgroundColor: '$blue',
  },
  editButtonText: {
    color: '$white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '$red',
  },
  deleteButtonText: {
    color: '$white',
    textAlign: 'center',
  },
  list: {
    backgroundColor: '$backgroundColor',
    flex: 1
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    height: 110,
    backgroundColor: '$backgroundColor',
  },
  numbersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  amountSpent: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  amountRemaining: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  itemTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '$graySeparator',
    width: 400
  },
  title: {
    fontSize: 18,
    color: '$darkTitle',
    fontWeight: 'bold',
    padding: 4
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '$grayBackground',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '$backgroundColor',
    borderBottomColor: '$grayBorder'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '$gray',
    marginTop: 4
  },
  empty: {
    color: '$blue',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
    paddingBottom: 30
  },
  red: {
    color: '$red',
  },
  green: {
    color: '$green',
  },
  blue: {
    color: '$blue',
  },
  subTitle: {
  },
  icon: {
    color: '$green',
    fontSize: 16,
    width: 16,
    height: 16,
  },
});

import {findCategory,importCategory}     from '../data/budget_category';
import {assign, findIndex} from 'lodash-node';
import {alert, confirm}   from '../utils/window';
import {destroyItem}      from '../data/budget_item';
import {numberToCurrency} from '../utils/ViewHelpers';

class BudgetCategory extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      budget_items: [],
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this._updateCategory();
  }

  importBudgetItems = async() => {
    try {
      let resp = await importCategory(this.props.budgetCategory.id);
      if (resp !== null) {
        const budgetCategory = Object.assign({}, this.props.budgetCategory, {budget_items: resp.imported})
        this.props.updateCategory(budgetCategory)
        alert({title: 'Import Finished', message: resp.message})
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  _updateCategory = async() => {
    let params = {
      year: this.props.budget.year,
      month: this.props.budget.month,
      id: this.props.budgetCategory.id
    }
    try {
      let resp = await findCategory(params);
      if (resp !== null) {
        this.props.updateCategory(resp.budget_category)
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  crudButtons = (item) => {
    const confirmText = `Are you sure you want to delete\n\n${item.name}\n\nThis cannot be undone.`;
    return (
      <View style={styles.crudContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={this.props.editBudgetItem.bind(this,item)}
          underlayColor='#EEE' >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            confirm('Confirm Delete', confirmText, this.deleteItem.bind(this, item))
          }}
          underlayColor='#EEE' >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    )
  }

  deleteItem = async(item) => {
    try {
      let resp = await destroyItem(item.id);
      if (resp.success) {
        this.props.deleteBudgetItem(item);
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  _getEmptyMessage = () => {
    const isDebts = (this.props.budgetCategory && this.props.budgetCategory.name === 'Debts')
    const isEmpty = this.props.budgetItems.length === 0;
    let emptyMessage = "You haven't added any budget items yet";
    if (isDebts)
      emptyMessage += ", that's a good thing 😉";

    if (isEmpty)
      return (
        <View style={styles.emptyRow}>
          <Text style={styles.empty}>{emptyMessage}</Text>
          <TouchableOpacity style={styles.importButton} onPress={this.importBudgetItems}>
            <Icon name="copy" style={styles.icon} />
            <Text style={styles.importButtonText}>Import Budget Items</Text>
          </TouchableOpacity>
        </View>
      )
  }

  footerRow = () => {
    const budget_category_id = this.props.budgetCategory ? this.props.budgetCategory.id : 0;
    let newBudgetItem = {budget_category_id};
    return (
      <View style={styles.addButtonContainer}>
        {this._getEmptyMessage()}
        <TouchableOpacity
          onPress={this.props.addBudgetItem.bind(this,newBudgetItem)}
          accessible={true}
          accessibilityLabel={`Add Budget Item`}>
          <Text style={styles.addButton}>+ Add a budget item</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _pressRow(budgetItem) {
    this.props.showBudgetItem(budgetItem)
  }

  amountSpent = (item) => {
    const expenses = where(this.props.budgetItemExpenses, {budget_item_id: item.id})
    const spent = reduce(expenses, function(sum, n) {
      return sum + parseFloat(n.amount);
    }, 0);
    return spent
  }

  _renderBudgetItemRow = (budgetItem: object, sectionID: number, rowID: number) => {
    console.log(budgetItem.name)
    const spent = this.amountSpent(budgetItem);
    const remaining = parseFloat(budgetItem.amount_budgeted).toFixed(2) - spent;
    const percentSpent = Math.min(100, parseInt(spent / budgetItem.amount_budgeted * 100));

    let remainingStyle = styles.red
    if (remaining === 0) {
      remainingStyle = styles.blue
    } else if (remaining > 0) {
      remainingStyle = styles.green
    }

    return (
      <TouchableHighlight
        onPress={()=>this._pressRow(budgetItem)}
        accessible={true}
        accessibilityLabel={`${budgetItem.name}`}
        underlayColor='#6699ff'>
        <View style={styles.row}>
          <View style={styles.itemTitle}>
            <Text style={styles.title} numberOfLines={1}>
              {budgetItem.name}
            </Text>
          </View>
          <View style={styles.numbersContainer}>
            <View style={styles.amountSpent}>
              <Text>
                {numberToCurrency(spent)}
              </Text>
            </View>
            <View style={styles.amountRemaining}>
              <Text style={remainingStyle}>
                {numberToCurrency(remaining)}
              </Text>
            </View>
          </View>
          <Meter percent={percentSpent} width={width - 20} />
        </View>
      </TouchableHighlight>
    );
  }

  separator(sectionID, rowID) {
    return <View key={`item-${sectionID}-${rowID}`} style={styles.separator} />
  }

  render() {
    let ds = new SwipeableListViewDataSource({
      getRowData: (data, sId, rId) => data[sId][rId],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const dataBlob = {'budget_items': this.props.budgetItems};
    const budgetItems = ds.cloneWithRowsAndSections(dataBlob);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budget Items</Text>
        </View>
        <SwipeableListView style={styles.list}
                  maxSwipeDistance={200}
                  renderQuickActions={this.crudButtons}
                  enableEmptySections={true}
                  initialListSize={this.props.budgetItems.length+1}
                  scrollsToTop={this.props.scrollsToTop}
                  automaticallyAdjustContentInsets={false}
                  dataSource={budgetItems}
                  renderRow={this._renderBudgetItemRow}
                  renderFooter={this.footerRow}
                  renderSeparator={this.separator} />
      </View>
    );
  }
}

module.exports = BudgetCategory;
