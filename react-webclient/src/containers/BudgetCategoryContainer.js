import { connect } from 'react-redux'
import BudgetCategory from '../components/BudgetCategory';
import { budgetCategoryImported } from '../actions/BudgetCategory';
import {filter} from 'lodash';

const mapStateToProps = (state) => {
  const budgetCategory = state.budgetState.budgetCategory;
  const hasBudgetItems = !!filter(state.budgetState.budgetItems, {budget_category_id: budgetCategory.id}).length;

  return {
    budgetCategory,
    hasBudgetItems,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    importedBudgetItems: (newBudgetItems) => {
      dispatch(budgetCategoryImported(newBudgetItems))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetCategory)
