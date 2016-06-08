import React, {Component} from 'react'
import {
  Image,
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
  container: {
    flex: 1,
    backgroundColor: WHITE,
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
  column: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: GRAY_SEPARATOR,
    width: 400
  },
  title: {
    fontSize: 18,
    color: DARK_TITLE,
    fontWeight: 'bold',
    padding: 4
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
  empty: {
    color: BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
    paddingBottom: 30
  },
});

import {findCategory}     from '../Data/budget_category';
import {assign, findIndex} from 'lodash-node';
import {alert, confirm}   from '../Utils/window';
import {destroyItem}      from '../Data/budget_item';
import {numberToCurrency} from '../Utils/ViewHelpers';

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

  _updateCategory = async() => {
    console.log(this.props)
    let params = {
      year: this.props.budgetDate.getFullYear(),
      month: this.props.budgetDate.getMonth()+1,
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

  editItem = async(item) => {
  }

  _getEmptyMessage = () => {
    const isEmpty = this.props.budgetItems.length === 0;
    const emptyMessage = "You haven't added any budget items yet";
    if (isEmpty)
      return (
        <Text style={styles.empty}>{emptyMessage}</Text>
      )
  }

  footerRow = () => {
    const budget_category_id = this.props.budgetCategory ? this.props.budgetCategory.id : 0;
    let newBudgetItem = {budget_category_id};
    return (
      <View style={styles.addButtonContainer}>
        {this._getEmptyMessage()}
        <TouchableOpacity onPress={this.props.addBudgetItem.bind(this,newBudgetItem)}>
          <Text style={styles.addButton}>+ Add a budget item</Text>
        </TouchableOpacity>
      </View>
    )
  }

  updateBudgetItems(json) {
    var ds = this.state.dataSource;
    var budget_items = json.budget_category.budget_items;
    this.setState({budget_items, dataSource: ds.cloneWithRows(budget_items)});
  }

  _updateList = async(data) => {
    try {
      // let json = await findCategory(data);
      // this.updateBudgetItems(json)
    } catch (error) {
      // this.props.signOut()
    }
  }

  _pressRow(budgetItem) {
    this.props.showBudgetItem(budgetItem)
  }

  _renderBudgetItemRow = (budgetItem: object, sectionID: number, rowID: number) => {
    return (
      <TouchableHighlight onPress={()=>this._pressRow(budgetItem)} underlayColor='#6699ff'>
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>
                {budgetItem.name}
              </Text>
            </View>
            <View style={styles.right}>
              <View style={styles.paid}>
                <Text style={{fontWeight: 'bold'}}>Spent: </Text>
                <Text style={styles.subTitle}>
                  {numberToCurrency(budgetItem.amount_spent)}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={{fontWeight: 'bold'}}>Remaining: </Text>
                <Text style={styles.subTitle}>
                  {numberToCurrency(budgetItem.amount_remaining)}
                </Text>
              </View>
            </View>
          </View>
          {this.crudButtons(budgetItem)}
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let budgetItems = ds.cloneWithRows(this.props.budgetItems)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budget Items</Text>
        </View>
        <ListView style={styles.list}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={budgetItems}
                  renderRow={this._renderBudgetItemRow}
                  renderFooter={this.footerRow} />
      </View>
    );
  }
}

module.exports = BudgetCategory;
