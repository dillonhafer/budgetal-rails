import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
  },
  text: {
    flexDirection: 'row'
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  paidSwitch: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingTop: 0,
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 0
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
    color: '#333'
  },
  form: {
    paddingTop: 20,
    backgroundColor: '#E4E4E4'
  },
  dateField: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '#DDD',
    backgroundColor: 'white',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    textAlign: 'right',
    fontSize: 16,
  },
  inputs: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '#DDD',
    backgroundColor: 'white',
    textAlign: 'right',
    borderWidth: 0,
  },
  saveButtonText: {
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#6699FF',
    marginTop: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

import {numberToCurrency, showErrors} from '../Utils/ViewHelpers';
import {updateItemExpense, createItemExpense} from '../Data/budgetItemExpense';
import DatePickerWithAccessory from '../Utils/DatePickerWithAccessory';

class BudgetItemExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
      budgetItemExpense: props.budgetItemExpense
    };
  }

  saveExpense = async() => {
    this.blurInputs();
    const budgetItemExpense = this.state.budgetItemExpense;
    let strategy = (budgetItemExpense.id === undefined) ? createItemExpense : updateItemExpense;
    let data = {budget_item_id: budgetItemExpense.budget_item_id, budget_item_expense: budgetItemExpense};

    try {
      let budgetItemExpense = await strategy(data);
      if (budgetItemExpense !== null && budgetItemExpense.errors === undefined) {
        if (strategy === createItemExpense) {
          this.props.addBudgetItemExpense(budgetItemExpense)
        } else {
          this.props.updateBudgetItemExpense(budgetItemExpense)
        }
        this.props.goBack();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  onDatePickerDone = () => {
    this.setState({showDatePicker: false});
  }

  onDateChange = (date) => {
    var b = this.state.budgetItemExpense;
    this.setState({budgetItemExpense: Object.assign(b, {date})});
  }

  blurInputs = () => {
    this.refs.name.blur();
    this.refs.amount.blur();
  }

  pickDate = () => {
    this.blurInputs();
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  render() {
    let b = this.state.budgetItemExpense;
    b.date = new Date(`${b.date} (CDT)`)
    return (
      <View style={[styles.container, styles.form]}>
        <Text style={styles.label}>Budget Item Expense</Text>
        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='(Life Insurrance)'
                       autoCapitalize='words'
                       ref='name'
                       onFocus={this.inputFocus}
                       onChangeText={(name)=> this.setState({budgetItemExpense: Object.assign({}, b, {name})})}
                       defaultValue={b.name} />
          </View>
        </View>

        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Amount</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='($42.00)'
                       keyboardType='decimal-pad'
                       ref="amount"
                       onFocus={this.inputFocus}
                       onChangeText={(amount)=> this.setState({budgetItemExpense: Object.assign({}, b, {amount})})}
                       defaultValue={b.amount} />
          </View>
        </View>

        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              style={styles.dateField}
              underlayColor='#f6f6f6'
              onPress={this.pickDate}>
              <Text style={styles.date}>{b.date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight
          underlayColor='#EEE'
          onPress={this.saveExpense}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.onDatePickerDone}
                                 date={b.date}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
}

module.exports = BudgetItemExpenseForm;
