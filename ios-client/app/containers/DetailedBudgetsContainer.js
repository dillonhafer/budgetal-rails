import { connect } from 'react-redux'

import DetailedBudget from '../components/DetailedBudget'
import { navigatePush, navigateReset } from '../actions/Navigation'
import { updateBudget, updateBudgetDate } from '../actions/DetailedBudgets'

const mapStateToProps = (state) => {
	return {
		budget: state.detailedBudgetState.budget,
		allocation_plans: state.detailedBudgetState.allocation_plans,
		scrollsToTop: state.navigationState.index === 0
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
		updateBudgetDate: (year,month) => {
			dispatch(updateBudgetDate(year,month))
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailedBudget)
