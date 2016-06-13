import React, {Component} from 'react'
import {
  LayoutAnimation,
  Text,
  TextInput,
  TouchableHighlight,
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
  }
});

import {numberToCurrency, showErrors} from '../Utils/ViewHelpers';
import {updateItem, createItem} from '../Data/budget_item';

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
    return (item.amount_budgeted && item.amount_budgeted.length) && (item.name && item.name.length)
  }

  render() {
    let b = this.state.budgetItem;
    const validForm = this._validForm(b);
    return (
      <View style={styles.form}>
        <Text style={styles.label}>Budget Item</Text>
        <FormInput placeholder='(Life Insurrance)'
                   required={true}
                   format='any'
                   autoCapitalize='words'
                   value={b.name}
                   onChangeText={(name)=> this.setState({budgetItem: Object.assign({}, b, {name})})}
                   label='Name'
                   defaultValue={b.name} />

        <FormInput placeholder='($42.00)'
                   required={true}
                   format='number'
                   keyboardType='decimal-pad'
                   value={b.amount_budgeted}
                   onChangeText={(amount_budgeted)=> this.setState({budgetItem: Object.assign({}, b, {amount_budgeted})})}
                   label='Budgeted'
                   defaultValue={b.amount_budgeted} />

        {this._saveButton(validForm)}
      </View>
    )
  }
}

module.exports = BudgetItemForm;
