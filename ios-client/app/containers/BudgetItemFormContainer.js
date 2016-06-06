import { connect } from 'react-redux'

import BudgetItemForm from '../Views/budgets/budget-items/form'
import { navigatePop, navigatePush, navigateReset } from '../actions'

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
		save: (budgetItem) => {
			dispatch(navigatePush({key: 'BudgetItemForm', title: 'New Budget Item', budgetItem}))
		},
    goBack: () => {
      dispatch(navigatePop());
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItemForm)
