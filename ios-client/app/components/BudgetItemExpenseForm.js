import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {updateItemExpense, createItemExpense, predictExpenses} from '../data/budgetItemExpense';

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
      budgetItemExpense: initialExpense,
      pastExpenses: [],
      loading: false,
    };
  }

  saveExpense = async() => {
    const budgetItemExpense = this.state.budgetItemExpense;
    let strategy = (budgetItemExpense.id === undefined) ? createItemExpense : updateItemExpense;
    let data = {budget_item_id: budgetItemExpense.budget_item_id, budget_item_expense: budgetItemExpense};

    try {
      this.setState({loading: true})
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
    } finally {
      this.setState({loading: false})
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

  updateAmount = (amount) => {
    this.setState({budgetItemExpense: Object.assign({}, this.state.budgetItemExpense, {amount})})
  }

  _validForm(item) {
    return (item.amount && item.amount.length) && (item.name && item.name.length)
  }

  _predict = async(name) => {
    try {
      let pastExpenses = await predictExpenses(name);
      if (pastExpenses !== null) {
        this.setState({pastExpenses});
      }
    } catch(err) {
      console.log(err)
    }
  }

  _updateExpenseName = (name) => {
    this.setState({budgetItemExpense: Object.assign({}, this.state.budgetItemExpense, {name})});
    if (name.length > 2 && !this.state.pastExpenses.includes(name)) {
      this._predict(name);
    } else {
      this.clearPastExpenses()
    }
  }

  clearPastExpenses = () => {
    if (this.state.pastExpenses.length) {
      this.setState({pastExpenses: []})
    }
  }

  render() {
    let b = this.state.budgetItemExpense;
    const disabled = !this._validForm(b) || this.state.loading;
    return (
      <FormContainer>
        <FormLabel label='BUDGET ITEM EXPENSES' />
        <InputContainer>
          <FormInput placeholder='(Life Insurrance)'
                     required={true}
                     format='any'
                     autoCapitalize='words'
                     value={b.name}
                     onChangeText={this._updateExpenseName}
                     label='Name'
                     onBlur={this.clearPastExpenses}
                     predictiveSource={this.state.pastExpenses}
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

        <InputButton disabled={disabled}
                     loading={this.state.loading}
                     onPress={this.saveExpense}
                     text='Save' />
      </FormContainer>
    )
  }
}

module.exports = BudgetItemExpenseForm;
