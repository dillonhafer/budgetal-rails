import React, {Component} from 'react'
import {LayoutAnimation,} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputContainer,
  InputButton,
} from './form-components'

import {showErrors} from '../utils/ViewHelpers';
import {update} from '../data/Budgets';

class MonthlyIncomeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      budget: props.budget,
      loading: false,
    };
  }

  updateIncome = async() => {
    const budget = Object.assign({}, this.state.budget);
    const params = {monthly_income: budget.monthly_income};
    this.setState({loading: true})

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
    } finally {
      this.setState({loading: false})
    }
  }

  _updateIncome = (monthly_income) => {
    const budget = Object.assign({}, this.state.budget, {monthly_income});
    this.setState({budget});
  }

  render() {
    const disabled = !this.state.budget.monthly_income.length || this.state.loading;
    return (
      <FormContainer>
        <FormLabel label='BUDGET' />
        <InputContainer>
          <FormInput placeholder='($4,000.00)'
                     required={true}
                     format='number'
                     keyboardType='decimal-pad'
                     value={this.state.budget.monthly_income}
                     onChangeText={(monthly_income) => this._updateIncome(monthly_income)}
                     label='Monthly Income'
                     defaultValue={this.state.budget.monthly_income} />
        </InputContainer>

        <InputButton disabled={disabled}
                     loading={this.state.loading}
                     onPress={this.updateIncome}
                     text='Update Income' />
      </FormContainer>
    )
  }
}

module.exports = MonthlyIncomeForm;
