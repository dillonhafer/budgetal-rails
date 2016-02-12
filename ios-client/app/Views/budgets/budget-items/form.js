'use strict';

let React = require('react-native');
let {
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

import styles from './styles';
import {numberToCurrency, showErrors} from '../../../Utils/ViewHelpers';
import {updateItem, createItem} from '../../../Data/budget_item';

let BudgetItemForm = React.createClass({
  getInitialState() {
    return ({
      budgetItem: {name: '', amount_budgeted: ''}
    });
  },
  componentDidMount() {
    if (this.props.route.data) {
      let budgetItem = this.props.route.data;
      this.setState({budgetItem});
    }
  },
  saveItem: async function() {
    this.refs.name.blur();
    this.refs.amount.blur();
    let strategy = (this.state.budgetItem.id === undefined) ? createItem : updateItem;
    let data = {budget_category_id: this.state.budgetItem.category_id, budget_item: this.state.budgetItem};

    try {
      let resp = await strategy(data);
      if (resp !== null && resp.errors === undefined) {
        this.props.navigator.props.popRoute();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.navigator.props.signOut();
    }
  },
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
          style={styles.button}
          underlayColor='#EEE'
          onPress={this.saveItem}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
})

module.exports = BudgetItemForm;
