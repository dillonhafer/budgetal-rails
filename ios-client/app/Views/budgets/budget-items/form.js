'use strict';

var React = require('react-native');
var {
  AlertIOS,
  SwitchIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var DatePickerWithAccessory = require('../../Utils/DatePickerWithAccessory');
var DataRepo = require('../../Data/AnnualBudgetRepository');
var styles = require("./styles");
var h = require("../../Utils/ViewHelpers");
var ConfirmDelete = require("../../Utils/ConfirmDelete");

var BudgetItemForm = React.createClass({
  getInitialState: function() {
    return ({
      budgetItem: {name: '', amount_budgeted: ''}
    });
  },
  componentDidMount: function() {
    if (this.props.route.data) {
      var budgetItem = this.props.route.data;
      budgetItem.due_date = (budgetItem.due_date) ? new Date(budgetItem.due_date) : new Date()
      this.setState({
        budgetItem: budgetItem,
        initialName: budgetItem.name,
        initialAmount: budgetItem.amount
      });
    }
  },
  saveItem: function() {
    var self = this
    this.blurInputs();
    if (this.state.budgetItem.id) {
      DataRepo.save(this.state.budgetItem)
        .then(function(json) {
          self.props.navigator.props.popRoute()
        })
    } else {
      DataRepo.create(this.state.budgetItem)
        .then(function(json) {
          self.props.navigator.props.popRoute()
        })
    }
  },
  deleteItem: function() {
    var self = this
    var item = this.state.budgetItem
    DataRepo.delete(item)
      .then(function(json) {
        self.props.navigator.props.popRoute()
        AlertIOS.alert(`Deleted ${item.name}`);
      })
  },
  deleteButton: function() {
    return (this.state.budgetItem.id) ? <ConfirmDelete delete={this.deleteItem} /> : <View />;
  },
  onDateChange: function(date) {
    var b = this.state.budgetItem;
    this.setState({budgetItem: Object.assign(b, {due_date: date})});
  },
  inputFocus: function() {
    this.setState({showDatePicker: false});
  },
  onDatePickerDone: function() {
    this.setState({showDatePicker: false});
  },
  blurInputs: function() {
    this.refs.name.blur();
    this.refs.amount.blur();
  },
  pickDate: function() {
    this.blurInputs();
    this.setState({showDatePicker: true});
  },
  render: function() {
    var b = this.state.budgetItem;
    return (
      <View style={[styles.container, styles.form]}>
        <Text style={styles.label}>Annual Budget</Text>
        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='Name (Life Insurrance)'
                       autoCapitalize='words'
                       ref='name'
                       onFocus={this.inputFocus}
                       onChangeText={(name)=> this.setState({budgetItem: Object.assign(b,{name})})}
                       defaultValue={b.name} />
          </View>
        </View>

        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Amount</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='Amount ($3.00)'
                       keyboardType='decimal-pad'
                       ref="amount"
                       onFocus={this.inputFocus}
                       onChangeText={(amount)=> this.setState({budgetItem: Object.assign(b,{amount})})}
                       defaultValue={h.numberToCurrency(b.amount, '')} />
          </View>
        </View>

        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Date Item Is Due</Text>
          </View>
          <View style={styles.right}>
            <TouchableHighlight
              style={[styles.inputs, {paddingTop: 8}]}
              underlayColor='#e6e6e6'
              onPress={this.pickDate}>
              <Text style={styles.date}>{b.due_date.toDateString()}</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.paidSwitch, {paddingTop: 5, paddingBottom: 5}]}>
          <View style={styles.column}>
            <Text style={styles.label}>Item is paid?</Text>
          </View>
          <View style={styles.right}>
            <SwitchIOS onValueChange={(paid) => this.setState({budgetItem: Object.assign(b,{paid})})}
                       value={b.paid}
                       onTintColor='#69F'
                       style={{alignItems: 'flex-end'}} />
          </View>
        </View>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#EEE'
          onPress={this.saveItem}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
        {this.deleteButton()}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.onDatePickerDone}
                                 date={b.due_date}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
})

module.exports = BudgetItemForm;
