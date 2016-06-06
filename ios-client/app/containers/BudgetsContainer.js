import { connect } from 'react-redux'

import Budgets from '../Views/budgets'
import { navigatePush, navigateReset } from '../actions'

const mapStateToProps = (state) => {
	return {
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
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Budgets)
