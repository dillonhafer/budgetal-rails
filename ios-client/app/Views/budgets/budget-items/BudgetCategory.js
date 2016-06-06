import React, {Component} from 'react'
import {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

const styles = require('./styles');
// import {findCategory}     from '../../../Data/budget_category';
import {assign, findIndex} from 'lodash-node';
import {alert, confirm}   from '../../../Utils/window';
import {destroyItem}      from '../../../Data/budget_item';
import {numberToCurrency} from '../../../Utils/ViewHelpers';

class BudgetCategory extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      budget_items: props.budgetCategory.budget_items,
      dataSource: ds.cloneWithRows(props.budgetCategory.budget_items),
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
        let budget_items = assign([], this.state.budget_items);
        let index        = findIndex(budget_items, {'id': item.id});
        budget_items.splice(index,1);
        let dataSource = this.state.dataSource.cloneWithRows(budget_items);
        this.setState({budget_items, dataSource});
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  editItem = async(item) => {
  }

  _getEmptyMessage = () => {
    const isEmpty = this.state.dataSource.getRowCount() === 0;
    const emptyMessage = "You haven't added any budget items yet";
    if (isEmpty)
      return (
        <Text style={styles.empty}>{emptyMessage}</Text>
      )
  }

  footerRow = () => {
    const budget_category_id = this.props.budgetCategory ? this.props.budgetCategory.id : 0;
    let budgetItem = {budget_category_id};
    return (
      <View style={styles.addButtonContainer}>
        {this._getEmptyMessage()}
        <TouchableOpacity onPress={this.props.addBudgetItem.bind(this,budgetItem)}>
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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budget Items</Text>
        </View>
        <ListView style={styles.list}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderBudgetItemRow}
                  renderFooter={this.footerRow} />
      </View>
    );
  }
}

module.exports = BudgetCategory;
