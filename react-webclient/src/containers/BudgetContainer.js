import { connect } from 'react-redux'
import Budget from '../components/Budget';
import { updateBudget, updateBudgetCategory, deleteBudgetItem } from '../actions/BudgetCategory';

const mapStateToProps = (state) => {
	const budget = state.budgetState.budget;
  const budgetCategory = state.budgetState.budgetCategory;
	const budgetItems = state.budgetState.budgetItems;
	const budgetItemExpenses = state.budgetState.budgetItemExpenses;

	return {
		budget, budgetCategory, budgetItems, budgetItemExpenses
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
		updateBudget: (budgetData) => {
			dispatch(updateBudget(budgetData))
		},
		updateCurrentCategory: (budgetCategory) => {
			dispatch(updateBudgetCategory(budgetCategory))
		},
		deleteBudgetItem: (budgetItem) => {
			dispatch(deleteBudgetItem(budgetItem));
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Budget)
