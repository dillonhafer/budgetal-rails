import { connect } from 'react-redux'
import BudgetSideBar from '../components/BudgetSideBar';
import { updateBudget, moveBudgetItem } from '../actions/BudgetItem';
import { updateBudgetCategory } from '../actions/BudgetCategory';
import {filter} from 'lodash';

const mapStateToProps = (state) => {
  const budget = state.budgetState.budget;
  const budgetItems = state.budgetState.budgetItems;
  const currentCategoryId = state.budgetState.budgetCategory.id;
  const currentCategoryName = state.budgetState.budgetCategory.name;

  return {
    budget,
    budgetItems,
    currentCategoryId,
    currentCategoryName,
    budgetCategories: budget.budget_categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    moveBudgetItem: (budgetCategoryId, item) => {
      dispatch(moveBudgetItem(budgetCategoryId, item))
    },
    changeCategory: (budgetCategory) => {
      dispatch(updateBudgetCategory(budgetCategory))
    },
    newBudgetItem: () => {
      dispatch(newBudgetItem())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetSideBar)
