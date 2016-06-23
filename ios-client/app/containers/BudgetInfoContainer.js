import { connect } from 'react-redux'

import BudgetInfo from '../components/BudgetInfo'
import { updateBudget } from '../actions/Budgets'
import { navigatePush } from '../actions/Navigation'

const mapStateToProps = (state) => {
	return {
		budget: state.budgetState.budget
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
		updateBudget: (budget) => {
			dispatch(updateBudget(budget))
		},
    editMonthlyIncome: () => {
      dispatch(navigatePush({key: 'MonthlyIncomeForm', title: 'Edit Monthly Income'}))
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetInfo)
