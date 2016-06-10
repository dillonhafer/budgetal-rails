import React, {Component} from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'

import {numberToCurrency, showErrors} from '../Utils/ViewHelpers';
import {updateItemExpense, createItemExpense} from '../Data/budgetItemExpense';
import DatePickerWithAccessory from '../Utils/DatePickerWithAccessory';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white'
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
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '$white',
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
    color: '$menuBackground'
  },
  form: {
    paddingTop: 20,
    backgroundColor: '$formBackground'
  },
  dateField: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '$grayBorder',
    backgroundColor: '$white',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    textAlign: 'right',
    fontSize: 16,
    color: '$formGray',
  },
  inputs: {
    color: '$formGray',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '$grayBorder',
    backgroundColor: '$white',
    textAlign: 'right',
    borderWidth: 0,
  },
  saveButton: {
    marginTop: 40,
  },
  saveButtonText: {
    textAlign: 'center',
    backgroundColor: '$white',
    color: '$blue',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '$grayBorder',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

class BudgetItemExpenseForm extends Component {
  constructor(props) {
    super(props)
    const initialExpense = Object.assign(
      {},
      props.budgetItemExpense,
      {date: this.formattedDate(props.budgetItemExpense.date)}
    )

    this.state = {
      showDatePicker: false,
      budgetItemExpense: initialExpense
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
    this.setState({budgetItemExpense: Object.assign({}, b, {date})});
  }

  blurInputs = () => {
    this.refs.name.blur();
    this.refs.amount.blur();
  }

  pickDate = () => {
    this.blurInputs();
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  formattedDate(date) {
    if (!date)
      return new Date()

    if (typeof date === 'string') {
      let [year,month,day] = date.split('-');
      return new Date(year, month-1, day,1,1,1,1);
    }

    return date
  }

  render() {
    let b = this.state.budgetItemExpense;
    return (
      <View style={[styles.container, styles.form]}>
        <Text style={styles.label}>Budget Item Expense</Text>
        <View style={styles.inputRow}>
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

        <View style={styles.inputRow}>
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

        <View style={styles.inputRow}>
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
          style={styles.saveButton}
          underlayColor='#6699ff'
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
