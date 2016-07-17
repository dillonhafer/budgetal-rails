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

import StyleSheet from './StyleSheet'

const styles = StyleSheet.create({
  error: {
    color: '$red',
  }
});

import {numberToCurrency, showErrors} from '../utils/ViewHelpers';
import {updateItem, createItem} from '../data/budget_item';

class BudgetItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      budgetItem: props.budgetItem
    };
  }

  saveItem = async() => {
    const budgetItem = this.state.budgetItem;
    let strategy = (budgetItem.id === undefined) ? createItem : updateItem;
    let data = {budget_category_id: budgetItem.budget_category_id, budget_item: budgetItem};

    try {
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
    }
  }

  _saveButton(valid) {
    LayoutAnimation.easeInEaseOut();
    if (valid) {
      return (
        <InputButton onPress={this.saveItem} text='Save' />
      )
    }
  }

  _validForm(item) {
    return (item.amount_budgeted && item.amount_budgeted.length) && (item.name && item.name.length)
  }

  render() {
    let b = this.state.budgetItem;
    const validForm = this._validForm(b);
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

        {this._saveButton(validForm)}
      </FormContainer>
    )
  }
}

module.exports = BudgetItemForm;
