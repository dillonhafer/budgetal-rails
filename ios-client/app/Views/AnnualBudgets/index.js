'use strict';

var React = require('react-native');
var {
  AlertIOS,
  Image,
  LayoutAnimation,
  LinkingIOS,
  ListView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  View
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var DataRepo = require('../../Data/AnnualBudgetRepository');
var BudgetForm = require('./form');
var styles = require('./styles');
var h = require('../../Utils/ViewHelpers');

var AnnualBudgets = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      year: (new Date).getFullYear(),
      dataSource: ds.cloneWithRows([]),
    };
  },
  nextYear: function() {
    var year = this.state.year+1
    this.setState({year: year})
    this._updateList(year)
  },
  previousYear: function() {
    var year = this.state.year-1
    this.setState({year: year})
    this._updateList(year)
  },
  componentDidMount: function() {
    this._updateList(this.state.year)
  },
  _updateList: function(year) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var self = this;
    DataRepo.all(year)
      .then(function(budget) {
        self.setState({dataSource: ds.cloneWithRows(budget.annual_budget_items)});
        self.props.navigator.props.updateAnnualBudgetId(budget.id)
      });
  },
  componentWillReceiveProps: function(nextProps) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var self = this;
    DataRepo.all(this.state.year)
      .then(function(budget) {
        self.setState({dataSource: ds.cloneWithRows(budget.annual_budget_items)});
      });
  },
  customNext: function() {
    return (
      <TouchableOpacity onPress={this.props.navigator.pop}>
        <View style={styles.navBarLeftButton}>
          <Image style={styles.back} source={images.coin} />
        </View>
      </TouchableOpacity>
    );
  },
  _onBack: function() {
    this.props.navigator.props.popRoute()
  },
  backButton: function() {
    return (
      <TouchableOpacity onPress={this._onBack}>
        <View style={styles.navBarLeftButton}>
          <Image style={styles.back} source={images.left} />
        </View>
      </TouchableOpacity>
    );
  },
  _pressRow: function(budgetItem) {
    this.props.navigator.props.pushRouteBack({
      title: `Edit ${h.capitalize(budgetItem.name)}`,
      component: BudgetForm,
      showMenu: false,
      leftCorner: this.backButton(),
      data: budgetItem
    });
  },
  _isPaid: function(paid) {
    return paid ? <Text style={styles.paidLabel}>Paid</Text> : <View />
  },
  _renderRow: function(budgetItem: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={()=>this._pressRow(budgetItem)} underlayColor='#6699ff'>
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>
                {h.capitalize(budgetItem.name)}
              </Text>
              <Text style={styles.amount}>
                {h.numberToCurrency(budgetItem.amount)} on {h.dueDate(budgetItem.due_date)}
              </Text>
              <Text style={styles.amountMonth}>
                {h.numberToCurrency(budgetItem.amount / 12)}/month
              </Text>
            </View>
            <View style={styles.right}>
              <View style={styles.paid}>
                {this._isPaid(budgetItem.paid)}
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
  empty: function() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={styles.nothing}>
          <Image source={require('image!cash_icon')} />
          <Text style={{textAlign: 'center',padding: 15}}>You haven't created any budget items for {this.state.year} yet!</Text>
        </View>
      );
    }
  },
  nextYearButton: function() {
    var shouldDisplay = this.state.year < (new Date).getFullYear()+2;
    var yearFunction = shouldDisplay ? this.nextYear : null;
    var color = shouldDisplay ? 'gray' : 'transparent';
    return (<TouchableHighlight
              style={[styles.rightYear]}
              underlayColor='transparent'
              onPress={yearFunction}>
              <Icon name="chevron-right" size={24} color={color} style={styles.icon} />
            </TouchableHighlight>);
  },
  previousYearButton() {
    var shouldDisplay = this.state.year > 2015;
    var yearFunction = shouldDisplay ? this.previousYear : null;
    var color = shouldDisplay ? 'gray' : 'transparent';
    return (<TouchableHighlight
              style={[styles.leftYear]}
              underlayColor='transparent'
              onPress={yearFunction}>
              <Icon name="chevron-left" size={24} color={color} style={styles.icon} />
            </TouchableHighlight>);
  },
  render: function() {
    return (
      <View style={styles.list}>
        <View style={styles.yearModifier}>
          {this.previousYearButton()}
          <Text ref='this' style={styles.centerYear}>{this.state.year}</Text>
          {this.nextYearButton()}
        </View>
        <ListView style={styles.list}
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.state.dataSource}
                  ref='annual_budget'
                  renderRow={this._renderRow} />
        {this.empty()}
      </View>
    )
  }
})

module.exports = AnnualBudgets;
