import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {update, create} from '../data/AnnualBudgets';

class AnnualBudgetItemForm extends Component {
  constructor(props) {
    super(props)
    const initialItem = Object.assign(
      {},
      props.budgetItem,
      {due_date: this.formattedDate(props.budgetItem.due_date)}
    )

    this.state = {
      budgetItem: initialItem
    };
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
      return <InputButton onPress={this.saveItem} text='Save' />
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
      <FormContainer>
        <FormLabel label='ANNUAL BUDGET ITEM' />
        <InputContainer>
          <FormInput placeholder='(Life Insurrance)'
                     required={true}
                     format='any'
                     autoCapitalize='words'
                     value={b.name}
                     onChangeText={(name) => this._updateField('name', name)}
                     label='Name'
                     defaultValue={b.name} />

          <InputSeparator />

          <FormInput placeholder='($400.00)'
                     required={true}
                     format='number'
                     keyboardType='decimal-pad'
                     value={b.amount}
                     onChangeText={(amount) => this._updateField('amount', amount)}
                     label='Budgeted'
                     defaultValue={b.amount} />

           <InputSeparator />

           <FormInput inputType='date'
                      label='Due Date'
                      date={b.due_date}
                      onDateChange={(due_date) => this._updateField('due_date', due_date)} />

           <InputSeparator />

           <FormInput inputType='switch'
                      format='switch'
                      value={b.paid}
                      onValueChange={(paid) => this._updateField('paid', paid)}
                      label='Paid?' />
        </InputContainer>

        {this._saveButton(validForm)}
      </FormContainer>
    )
  }
}

module.exports = AnnualBudgetItemForm;
