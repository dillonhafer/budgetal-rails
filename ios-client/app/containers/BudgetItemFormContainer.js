import { connect } from 'react-redux'

import BudgetItemForm from '../components/BudgetItemForm'
import { navigatePop, navigatePush, navigateReset } from '../actions/Navigation'
import { updateBudgetItem, addBudgetItem } from '../actions/Budgets'

const mapStateToProps = (state) => {
	let budgetItem = state.navigationState.routes[state.navigationState.index].budgetItem;
	return {
		budgetItem
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
		save: (budgetItem) => {
			dispatch(navigatePush({key: 'BudgetItemForm', title: 'New Budget Item', budgetItem}))
		},
    goBack: () => {
      dispatch(navigatePop());
    },
		updateBudgetItem: (budgetItem) => {
			dispatch(updateBudgetItem(budgetItem));
		},
		addBudgetItem: (budgetItem) => {
			dispatch(addBudgetItem(budgetItem));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItemForm)
