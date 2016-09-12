import { connect } from 'react-redux'
import BudgetSideBar from '../components/BudgetSideBar';
import { updateBudget, moveBudgetItem } from '../actions/BudgetItem';
import { updateBudgetCategory } from '../actions/BudgetCategory';
import {filter} from 'lodash';

const mapStateToProps = (state) => {
  const budget = state.budgetState.budget;
  const budgetItems = state.budgetState.budgetItems;
  const currentCategoryId = state.budgetState.budgetCategory.id;

  return {
    budget, budgetItems, currentCategoryId
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
