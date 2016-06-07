import { connect } from 'react-redux'

import BudgetItemExpenseForm from '../components/BudgetItemExpenseForm'
import { navigatePop, navigatePush, navigateReset } from '../actions'

const mapStateToProps = (state) => {
	let budgetItemExpense = state.navigationState.children[state.navigationState.index].budgetItemExpense;
	return {
		budgetItemExpense
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
		},
    goBack: () => {
      dispatch(navigatePop());
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItemExpenseForm)
