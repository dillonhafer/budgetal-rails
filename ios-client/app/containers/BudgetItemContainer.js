import { connect } from 'react-redux'

import BudgetItem from '../components/BudgetItem'
import { navigatePush, navigateReset } from '../actions'
import { deleteBudgetItemExpense } from '../budgetActions'
import {find, where} from 'lodash-node'

const mapStateToProps = (state) => {
	const item = state.navigationState.children[state.navigationState.index].budgetItem;
	const id = item ? item.id : 0;
	const budgetItem = find(state.budgetState.budgetItems, {id})
	const budgetItemExpenses = where(state.budgetState.budgetItemExpenses, {budget_item_id: id});
	return {
		budgetItem,
		budgetItemExpenses
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
		},
		deleteBudgetItemExpense: (budgetItemExpense) => {
			dispatch(deleteBudgetItemExpense(budgetItemExpense));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItem)
