import React, {Component} from 'react'
import {
  LayoutAnimation,
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
import {updateItem, createItem} from '../data/budget_item';

class BudgetItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      budgetItem: props.budgetItem,
      loading: false,
    };
  }

  saveItem = async() => {
    const budgetItem = this.state.budgetItem;
    let strategy = (budgetItem.id === undefined) ? createItem : updateItem;
    let data = {budget_category_id: budgetItem.budget_category_id, budget_item: budgetItem};

    try {
      this.setState({loading: true})
      let budgetItem = await strategy(data);
      if (budgetItem !== null && budgetItem.errors === undefined) {
        if (strategy === createItem) {
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
      this.setState({loading: false})
    }
  }

  _validForm(item) {
    return (item.amount_budgeted && item.amount_budgeted.length) && (item.name && item.name.length)
  }

  render() {
    let b = this.state.budgetItem;
    const disabled = !this._validForm(b) || this.state.loading;
    return (
      <FormContainer>
        <FormLabel label='BUDGET ITEM' />
        <InputContainer>
          <FormInput placeholder='(Life Insurrance)'
                     required={true}
                     accessible={true}
                     accessibilityLabel={`Name`}
                     format='any'
                     autoCapitalize='words'
                     value={b.name}
                     onChangeText={(name)=> this.setState({budgetItem: Object.assign({}, b, {name})})}
                     label='Name'
                     defaultValue={b.name} />
          <InputSeparator />
          <FormInput placeholder='($42.00)'
                     required={true}
                     accessible={true}
                     accessibilityLabel={`Budgeted`}
                     format='number'
                     keyboardType='decimal-pad'
                     value={b.amount_budgeted}
                     onChangeText={(amount_budgeted)=> this.setState({budgetItem: Object.assign({}, b, {amount_budgeted})})}
                     label='Budgeted'
                     defaultValue={b.amount_budgeted} />
        </InputContainer>

        <InputButton disabled={disabled}
                     loading={this.state.loading}
                     onPress={this.saveItem}
                     text='Save' />
      </FormContainer>
    )
  }
}

module.exports = BudgetItemForm;
