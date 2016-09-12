import { connect } from 'react-redux';
import BudgetCategoryOverview from '../components/BudgetCategoryOverview';
import {reduceSum} from '../utils/helpers';
import {round,filter,map} from 'lodash';

const mapStateToProps = (state) => {
  const categoryName          = state.budgetState.budgetCategory.name;
  const recommendedPercentage = state.budgetState.budgetCategory.percentage;
  const monthlyIncome         = round(state.budgetState.budget.monthly_income, 2);

  const budgetItems = filter(state.budgetState.budgetItems, {budget_category_id: state.budgetState.budgetCategory.id})
  const budgetItemIds = map(budgetItems, (item) => item.id)
  const budgetItemExpenses = filter(state.budgetState.budgetItemExpenses, (expense) => {
    return budgetItemIds.includes(expense.budget_item_id)
  })

  const amountBudgeted  = reduceSum(budgetItems, 'amount_budgeted');
  const amountSpent     = reduceSum(budgetItemExpenses);
  const amountRemaining = amountBudgeted - amountSpent;

  return {
    categoryName,
    recommendedPercentage,
    monthlyIncome,
    amountSpent,
    amountBudgeted,
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
)(BudgetCategoryOverview)
