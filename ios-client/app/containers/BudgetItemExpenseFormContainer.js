import { connect } from 'react-redux'

import BudgetItemExpenseForm from '../components/BudgetItemExpenseForm'
import { navigatePop, navigatePush, navigateReset } from '../actions/Navigation'
import { updateBudgetItemExpense, addBudgetItemExpense } from '../actions/Budgets'

const mapStateToProps = (state) => {
	let budgetItemExpense = state.navigationState.routes[state.navigationState.index].budgetItemExpense;
	return {
		budgetItemExpense
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
    goBack: () => {
      dispatch(navigatePop());
    },
		updateBudgetItemExpense: (budgetItemExpense) => {
			dispatch(updateBudgetItemExpense(budgetItemExpense));
		},
		addBudgetItemExpense: (budgetItemExpense) => {
			dispatch(addBudgetItemExpense(budgetItemExpense));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItemExpenseForm)
