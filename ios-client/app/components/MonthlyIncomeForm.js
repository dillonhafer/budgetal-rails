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
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 4,
    color: '$formLabel'
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
});

import {showErrors} from '../utils/ViewHelpers';
import {update} from '../data/Budgets';

class MonthlyIncomeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      budget: props.budget
    };
  }

  updateIncome = async() => {
    const budget = Object.assign({}, this.state.budget);
    const params = {monthly_income: budget.monthly_income};

    try {
      let resp = await update(budget.year, budget.month, params);
      if (resp !== null && resp.errors === undefined) {
        this.props.updateBudget(resp)
        this.props.goBack();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.endSession();
    }
  }

  _saveButton(valid) {
    LayoutAnimation.easeInEaseOut();
    if (valid) {
      return (
        <TouchableHighlight
          style={styles.saveButton}
          underlayColor={'#6699ff'}
          onPress={this.updateIncome}>
          <Text style={styles.saveButtonText}>Update Income</Text>
        </TouchableHighlight>
      )
    }
  }

  _validForm(budget) {
    return budget.monthly_income.length
  }

  _updateField = (name, value) => {
    const original = this.state.budget;
    const budget = Object.assign({}, original, {[name]: value})
    this.setState({budget})
  }

  render() {
    let b = this.state.budget;
    const validForm = this._validForm(b);
    return (
      <View style={styles.form}>
        <Text style={styles.label}>BUDGET</Text>

        <FormInput placeholder='($4,000.00)'
                   required={true}
                   format='number'
                   keyboardType='decimal-pad'
                   value={b.monthly_income}
                   onChangeText={(monthly_income) => this._updateField('monthly_income', monthly_income)}
                   label='Monthly Income'
                   defaultValue={b.monthly_income} />

        {this._saveButton(validForm)}
      </View>
    )
  }
}

module.exports = MonthlyIncomeForm;
