import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

import FormInput from './FormInput';
import StyleSheet from './StyleSheet'

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
    color: '$menuBackground'
  },
  form: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$formBackground'
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
  },
  // DateStyles below
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 14
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
});

import {numberToCurrency, showErrors} from '../Utils/ViewHelpers';
import DatePickerWithAccessory from '../Utils/DatePickerWithAccessory';
import {update, create} from '../Data/AnnualBudgets';

class AnnualBudgetItemForm extends Component {
  constructor(props) {
    super(props)
    const initialItem = Object.assign(
      {},
      props.budgetItem,
      {due_date: this.formattedDate(props.budgetItem.due_date)}
    )

    this.state = {
      showDatePicker: false,
      budgetItem: initialItem
    };
  }

  onDatePickerDone = () => {
    this.setState({showDatePicker: false});
  }

  pickDate = () => {
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  formattedDate(date) {
    if (!date)
      return new Date()

    if (typeof date === 'string') {
      let [year,month,day] = date.split('-');
      return new Date(year, month-1, day);
    }

    return date
  }

  saveItem = async() => {
    const budgetItem = this.state.budgetItem;
    let strategy = (budgetItem.id === undefined) ? create : update;
    let data = {annual_budget_id: budgetItem.annual_budget_id, annual_budget_item: budgetItem};

    try {
      let budgetItem = await strategy(data);
      if (budgetItem !== null && budgetItem.errors === undefined) {
        if (strategy === create) {
          this.props.addBudgetItem(budgetItem)
        } else {
          this.props.updateBudgetItem(budgetItem)
        }
        this.props.goBack();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.signOut();
    }
  }

  _saveButton(valid) {
    LayoutAnimation.easeInEaseOut();
    if (valid) {
      return (
        <TouchableHighlight
          style={styles.saveButton}
          underlayColor={'#6699ff'}
          onPress={this.saveItem}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      )
    }
  }

  _validForm(item) {
    return (item.amount && item.amount.length) && (item.name && item.name.length)
  }

  _updateField = (name, value) => {
    const original = this.state.budgetItem;
    const budgetItem = Object.assign({}, original, {[name]: value})
    this.setState({budgetItem})
  }

  render() {
    let b = this.state.budgetItem;
    const validForm = this._validForm(b);
    return (
      <View style={styles.form}>
        <Text style={styles.label}>Annual Budget Item</Text>
        <FormInput placeholder='(Life Insurrance)'
                   required={true}
                   format='any'
                   autoCapitalize='words'
                   value={b.name}
                   onChangeText={(name) => this._updateField('name', name)}
                   label='Name'
                   defaultValue={b.name} />

        <FormInput placeholder='($400.00)'
                   required={true}
                   format='number'
                   keyboardType='decimal-pad'
                   value={b.amount}
                   onChangeText={(amount) => this._updateField('amount', amount)}
                   label='Budgeted'
                   defaultValue={b.amount} />

         <View style={styles.inputRow}>
           <View style={styles.column}>
             <Text style={styles.label}>Due Date</Text>
           </View>
           <View style={styles.right}>
             <TouchableOpacity
               style={styles.dateField}
               underlayColor='#f6f6f6'
               onPress={this.pickDate}>
               <Text style={styles.date}>{b.due_date.toDateString()}</Text>
             </TouchableOpacity>
           </View>
         </View>

         <FormInput inputType='switch'
                    format='switch'
                    value={b.paid}
                    onValueChange={(paid) => this._updateField('paid', paid)}
                    label='Paid?' />

        {this._saveButton(validForm)}

        <DatePickerWithAccessory showDatePicker={this.state.showDatePicker}
                                 onDone={this.onDatePickerDone}
                                 date={b.due_date}
                                 onDateChange={(due_date) => this._updateField('due_date', due_date)} />
      </View>
    )
  }
}

module.exports = AnnualBudgetItemForm;
