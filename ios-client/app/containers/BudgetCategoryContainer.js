import { connect } from 'react-redux'

import BudgetCategory from '../components/BudgetCategory'
import { navigatePush, navigateReset } from '../actions'
import { updateBudgetCategory, deleteBudgetItem } from '../budgetActions'

const mapStateToProps = (state) => {
	let idx = state.navigationState.index;
	let navCategory = state.navigationState.children[idx].budgetCategory;
	let budgetCategory = (state.budgetState.budgetCategory && navCategory && state.budgetState.budgetCategory.id === navCategory.id) ? state.budgetState.budgetCategory : navCategory;
	let budgetDate = state.budgetState.budgetDate;
	let budgetItems = state.budgetState.budgetItems;

	return {
		budgetCategory, budgetItems, budgetDate,
		scrollsToTop: state.navigationState.index === 1
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
		},
		addBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'BudgetItemForm', title: 'New Budget Item', budgetItem}))
		},
		editBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'BudgetItemForm', title: `Edit ${budgetItem.name}`, budgetItem}))
		},
		showBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'BudgetItem', title: budgetItem.name, budgetItem}))
		},
		updateCategory: (budgetCategory) => {
			dispatch(updateBudgetCategory(budgetCategory))
		},
		deleteBudgetItem: (budgetItem) => {
			dispatch(deleteBudgetItem(budgetItem));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetCategory)
