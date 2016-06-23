import { connect } from 'react-redux'

import BudgetInfo from '../components/BudgetInfo'
import { updateBudget } from '../actions/Budgets'

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
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetInfo)
