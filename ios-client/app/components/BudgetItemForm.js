import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
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
  paidSwitch: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
    color: '#333'
  },
  form: {
    paddingTop: 20,
    backgroundColor: '#E4E4E4'
  },
  inputs: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    height: 40,
    borderColor: '#DDD',
    backgroundColor: 'white',
    textAlign: 'right',
    borderWidth: 0,
  },
  saveButtonText: {
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#6699FF',
    marginTop: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    height: 40,
    borderColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
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
    this.refs.name.blur();
    this.refs.amount.blur();
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

  render() {
    let b = this.state.budgetItem;
    return (
      <View style={[styles.container, styles.form]}>
        <Text style={styles.label}>Budget Item</Text>
        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='(Life Insurrance)'
                       autoCapitalize='words'
                       ref='name'
                       onFocus={this.inputFocus}
                       onChangeText={(name)=> this.setState({budgetItem: Object.assign({}, b, {name})})}
                       defaultValue={b.name} />
          </View>
        </View>

        <View style={styles.paidSwitch}>
          <View style={styles.column}>
            <Text style={styles.label}>Budgeted</Text>
          </View>
          <View style={styles.right}>
            <TextInput style={styles.inputs} placeholder='($42.00)'
                       keyboardType='decimal-pad'
                       ref="amount"
                       onFocus={this.inputFocus}
                       onChangeText={(amount_budgeted)=> this.setState({budgetItem: Object.assign({}, b, {amount_budgeted})})}
                       defaultValue={b.amount_budgeted} />
          </View>
        </View>

        <TouchableHighlight
          underlayColor='#EEE'
          onPress={this.saveItem}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = BudgetItemForm;
