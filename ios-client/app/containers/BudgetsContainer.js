import { connect } from 'react-redux'

import Budgets from '../components/Budget'
import { navigatePush, navigateReset } from '../actions/Navigation'
import { updateBudget, updateBudgetDate } from '../actions/Budgets'

const mapStateToProps = (state) => {
	return {
		budget: state.budgetState.budget,
		budgetCategories: state.budgetState.budgetCategories,
		budgetItems: state.budgetState.budgetCategories,
		scrollsToTop: state.navigationState.index === 0
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
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
		updateBudgetDate: (year,month) => {
			dispatch(updateBudgetDate(year,month))
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Budgets)
