import { connect } from 'react-redux'
import BudgetItemList from '../components/BudgetItemList';
import { newBudgetItem } from '../actions/BudgetItem';
import {filter} from 'lodash';

const mapStateToProps = (state) => {
  const budgetCategory = state.budgetState.budgetCategory;
	const budgetItems = filter(state.budgetState.budgetItems, {budget_category_id: budgetCategory.id});

	return {
		budgetCategory, budgetItems
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
    newBudgetItem: () => {
      dispatch(newBudgetItem())
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItemList)
