import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {updateItemExpense, createItemExpense} from '../data/budgetItemExpense';
import DatePickerWithAccessory from '../utils/DatePickerWithAccessory';
import FormInput from './FormInput';

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
  error: {
    color: '$red',
  }
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

  pickDate = () => {
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

  _saveButton(valid) {
    LayoutAnimation.easeInEaseOut();
    if (valid) {
      return (
        <TouchableHighlight
          style={styles.saveButton}
          underlayColor={'#6699ff'}
          onPress={this.saveExpense}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      )
    }
  }

  updateAmount = (amount) => {
    this.setState({budgetItemExpense: Object.assign({}, this.state.budgetItemExpense, {amount})})
  }

  _validForm(item) {
    return (item.amount && item.amount.length) && (item.name && item.name.length)
  }

  render() {
    let b = this.state.budgetItemExpense;
    const validForm = this._validForm(b);
    return (
      <View style={[styles.container, styles.form]}>
        <Text style={styles.label}>Budget Item Expense</Text>

        <FormInput placeholder='(Life Insurrance)'
                   required={true}
                   format='any'
                   autoCapitalize='words'
                   value={b.name}
                   onChangeText={(name)=> this.setState({budgetItemExpense: Object.assign({}, b, {name})})}
                   label='Name'
                   defaultValue={b.name} />

        <FormInput placeholder='($42.00)'
                   required={true}
                   format='number'
                   ref='amount'
                   keyboardType='numeric'
                   autoCapitalize='words'
                   value={b.amount}
                   onChangeText={this.updateAmount}
                   label='Amount'
                   defaultValue={b.amount} />

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

        {this._saveButton(validForm)}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.onDatePickerDone}
                                 date={b.date}
                                 onDateChange={this.onDateChange} />
      </View>
    )
  }
}

module.exports = BudgetItemExpenseForm;
