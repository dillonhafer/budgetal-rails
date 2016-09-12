import { connect } from 'react-redux'
import BudgetForm from '../components/BudgetForm';
import { updateBudget } from '../actions/BudgetCategory';
import {reduceSum} from '../utils/helpers';

const mapStateToProps = (state) => {
  const budget      = state.budgetState.budget;
  const budgetItems = state.budgetState.budgetItems;

  const amountBudgeted = reduceSum(budgetItems, 'amount_budgeted')
  const notBudgeted    = parseFloat(budget.monthly_income) - amountBudgeted;

  return {
    budget,
    notBudgeted,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    updateBudget: (budget) => {
      dispatch(updateBudget(budget))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetForm)
