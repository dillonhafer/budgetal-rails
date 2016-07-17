import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {updateItemExpense, createItemExpense} from '../data/budgetItemExpense';
import DatePickerWithAccessory from '../utils/DatePickerWithAccessory';

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
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
  dateLabel: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
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
        <InputButton onPress={this.saveExpense} text='Save' />
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
      <FormContainer>
        <FormLabel label='BUDGET ITEM EXPENSES' />
        <InputContainer>
          <FormInput placeholder='(Life Insurrance)'
                     required={true}
                     format='any'
                     autoCapitalize='words'
                     value={b.name}
                     onChangeText={(name)=> this.setState({budgetItemExpense: Object.assign({}, b, {name})})}
                     label='Name'
                     defaultValue={b.name} />

          <InputSeparator />

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

          <InputSeparator />

          <View style={styles.inputRow}>
            <View style={styles.column}>
              <Text style={styles.dateLabel}>Date</Text>
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
        </InputContainer>


        {this._saveButton(validForm)}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.onDatePickerDone}
                                 date={b.date}
                                 onDateChange={this.onDateChange} />
      </FormContainer>
    )
  }
}

module.exports = BudgetItemExpenseForm;
