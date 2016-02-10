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

var styles = require('./styles');
var BudgetCategoriesRepo = require('../../../Data/BudgetCategoriesRepository');
var BudgetItem = require('./BudgetItem');
import {findCategory} from '../../../Data/budget_category';
var h = require('../../../Utils/ViewHelpers');

var BudgetCategory = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      budget_category: {
        budget_items: []
      },
      budgetItems: ds.cloneWithRows([]),
    }
  },
  addButton: function() {
    return (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={()=>console.log('f')}>
          <Text style={styles.addButton}>+ Add a budget item</Text>
        </TouchableOpacity>
      </View>
    )
  },
  updateBudgetItems: function(json) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({budgetItems: ds.cloneWithRows(json.budget_category.budget_items)});
  },
  componentDidMount: function() {
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
      let budget_category = await findCategory(data);
      this.updateBudgetItems(budget_category)
    } catch(error) {
      this.props.navigator.props.signOut()
    }
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
  _pressRow: function(budgetItem) {
    this.props.navigator.props.pushRouteBack({
      title: budgetItem.name,
      component: BudgetItem,
      showMenu: false,
      leftCorner: this.backButton(),
      data: budgetItem
    });
  },
  _renderRow: function(budgetItem: string, sectionID: number, rowID: number) {
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
                  {h.numberToCurrency(budgetItem.amount_spent)}
                </Text>
              </View>
              <View style={styles.paid}>
                <Text style={{fontWeight: 'bold'}}>Remaining: </Text>
                <Text style={styles.subTitle}>
                  {h.numberToCurrency(budgetItem.amount_remaining)}
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
                  dataSource={this.state.budgetItems}
                  renderRow={this._renderRow}
                  renderFooter={this.addButton} />
      </View>
    )
  }
})

module.exports = BudgetCategory;
