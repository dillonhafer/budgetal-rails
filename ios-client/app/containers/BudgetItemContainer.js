import { connect } from 'react-redux'

import BudgetItem from '../components/BudgetItem'
import { navigatePush, navigateReset } from '../actions'

const mapStateToProps = (state) => {
	let budgetItem = state.navigationState.children[state.navigationState.index].budgetItem;
	return {
		budgetItem
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
		},
		addBudgetItemExpense: (budgetItemExpense) => {
			dispatch(navigatePush({key: 'BudgetItemExpenseForm', title: 'New Expense', budgetItemExpense}))
		},
		editBudgetItemExpense: (budgetItemExpense) => {
			dispatch(navigatePush({key: 'BudgetItemExpenseForm', title: 'Edit Expense', budgetItemExpense}))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItem)
