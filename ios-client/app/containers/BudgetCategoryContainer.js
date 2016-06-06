import { connect } from 'react-redux'

import BudgetCategory from '../Views/budgets/budget-items'
import { navigatePush, navigateReset } from '../actions'

const mapStateToProps = (state) => {
	let budgetCategory = state.navigationState.children[state.navigationState.index].budgetCategory;
	return {
		budgetCategory
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
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetCategory)
