'use strict';

var React = require('react-native');
import {
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

var styles = require('./styles');
var BudgetItem = require('./expenses');
var form = require('./form');

import {alert, confirm}   from '../../../Utils/window';
import {findCategory}     from '../../../Data/budget_category';
import {destroyItem}      from '../../../Data/budget_item';
import {numberToCurrency} from '../../../Utils/ViewHelpers';
import Swipeout           from 'react-native-swipeout';

var BudgetCategory = React.createClass({
  swipeoutBtns(item) {
    const confirmText = `Are you sure you want to delete\n\n${item.name}\n\nThis cannot be undone.`;
    return [
      {
        text: 'Edit',
        color: 'white',
        backgroundColor: '#69F',
        onPress: () => { alert({title: 'edit', message: numberToCurrency(item.amount_spent)}) }
      },
      {
        text: 'Delete',
        color: 'white',
        backgroundColor: '#f04124',
        onPress: () => {
          confirm('Confirm Delete', confirmText, this.deleteItem.bind(this, item))
        }
      },
      {text: 'Cancel', color: '#555'}
    ];
  },
  deleteItem: async function(item) {
    try {
      let resp = await destroyItem(item.id);
      if (resp.success) {
        let budget_items = _.assign([], this.state.budget_items);
        let index        = _.findIndex(budget_items, {'id': item.id});
        budget_items.splice(index,1);
        let dataSource = this.state.dataSource.cloneWithRows(budget_items);
        this.setState({budget_items, dataSource});
      }
    } catch (err) {
      this.props.navigator.props.signOut();
    }
  },
  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      budget_items: [],
      dataSource: ds.cloneWithRows([]),
    }
  },
  addItem() {
    this.props.navigator.props.pushRouteBack({
      title: 'Add Item',
      component: form,
      showMenu: false,
      left: this.backButton(),
      data: {category_id: this.props.route.data.budget_category.id}
    });
  },
  footerRow() {
    let if_empty = <View />;
    if (this.state.dataSource.getRowCount() === 0) {
      if_empty = <Text style={styles.empty}>You haven't added any budget items yet</Text>;
    }
    return (
      <View style={styles.addButtonContainer}>
        {if_empty}
        <TouchableOpacity onPress={this.addItem}>
          <Text style={styles.addButton}>+ Add a budget item</Text>
        </TouchableOpacity>
      </View>
    )
  },
  updateBudgetItems(json) {
    var ds = this.state.dataSource;
    var budget_items = json.budget_category.budget_items;
    this.setState({budget_items, dataSource: ds.cloneWithRows(budget_items)});
  },
  componentDidMount() {
    let routeData = this.props.route.data;
    let data = {
      id: routeData.budget_category.id,
      year: routeData.date.year,
      month: routeData.date.month
    };
    this._updateList(data)
  },
  _updateList: async function(data) {
    try {
      let json = await findCategory(data);
      this.updateBudgetItems(json)
    } catch (error) {
      this.props.navigator.props.signOut()
    }
  },
  backButton() {
    return (
      <TouchableOpacity onPress={this.props.navigator.props.popRoute}>
        <View style={styles.navBarLeftButton}>
          <Image style={styles.back} source={require('image!left_icon')} />
        </View>
      </TouchableOpacity>
    );
  },
  _pressRow(budgetItem) {
    this.props.navigator.props.pushRouteBack({
      title: budgetItem.name,
      component: BudgetItem,
      showMenu: false,
      left: this.backButton(),
      data: budgetItem
    });
  },
  _renderRow(budgetItem: object, sectionID: number, rowID: number) {
    return (
      <Swipeout right={this.swipeoutBtns(budgetItem)} autoClose={true} item={budgetItem} sectionID={sectionID} key={budgetItem.id}>
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
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budget Items</Text>
        </View>

        <ListView style={styles.list}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}
                  renderFooter={this.footerRow} />
      </View>
    );
  }
});

module.exports = BudgetCategory;
