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
      budgetItem: initialItem,
      loading: false,
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
      this.setState({loading: true});
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
    } finally {
      this.setState({loading: false});
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
    const disabled = !this._validForm(b) || this.state.loading;
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

          <FormInput inputType='number'
                     placeholder='($400.00)'
                     required={true}
                     format='number'
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

        <InputButton disabled={disabled}
                     loading={this.state.loading}
                     onPress={this.saveItem}
                     text='Save Item' />
      </FormContainer>
    )
  }
}

module.exports = AnnualBudgetItemForm;
