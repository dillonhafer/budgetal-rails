import { connect } from 'react-redux'

import Budgets from '../components/Budget'
import { navigatePush, navigateReset } from '../actions'
import { updateBudget, updateBudgetDate } from '../budgetActions'

const mapStateToProps = (state) => {
	return {
		budget: state.budgetState.budget,
		budgetDate: state.budgetState.budgetDate
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
      window.alert({title: 'Signed Out', message: "Thanks for using Budgetal!"});
			dispatch(navigateReset([{key: 'SignIn', title: ''}],0))
		},
		showBudgetCategory: (budgetCategory) => {
			dispatch(navigatePush({key: 'BudgetCategory', title: budgetCategory.name, budgetCategory}))
		},
		updateBudget: (budget) => {
			dispatch(updateBudget(budget))
		},
		updateBudgetDate: (date) => {
			dispatch(updateBudgetDate(date))
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Budgets)
