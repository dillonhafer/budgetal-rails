import { connect } from 'react-redux'
import Overview from '../components/Overview';
import { updateBudget } from '../actions/BudgetCategory';
import {reduceSum} from '../utils/helpers';

const mapStateToProps = (state) => {
  const monthlyIncome   = state.budgetState.budget.monthly_income;
  const amountBudgeted  = reduceSum(state.budgetState.budgetItems, 'amount_budgeted');
  const amountSpent     = reduceSum(state.budgetState.budgetItemExpenses);
  const amountRemaining = amountBudgeted - amountSpent;

  return {
    monthlyIncome,
    amountBudgeted,
    amountSpent,
    amountRemaining,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
