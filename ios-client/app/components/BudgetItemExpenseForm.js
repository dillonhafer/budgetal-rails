import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {updateItemExpense, createItemExpense} from '../data/budgetItemExpense';

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

class BudgetItemExpenseForm extends Component {
  constructor(props) {
    super(props)
    const initialExpense = Object.assign(
      {},
      props.budgetItemExpense,
      {date: this.formattedDate(props.budgetItemExpense.date)}
    )

    this.state = {
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

  onDateChange = (date) => {
    var b = this.state.budgetItemExpense;
    this.setState({budgetItemExpense: Object.assign({}, b, {date})});
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

          <FormInput inputType='date'
                     label='Date'
                     date={b.date}
                     onDateChange={this.onDateChange} />
        </InputContainer>

        {this._saveButton(validForm)}
      </FormContainer>
    )
  }
}

module.exports = BudgetItemExpenseForm;
