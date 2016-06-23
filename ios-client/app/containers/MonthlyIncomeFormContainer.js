import { connect } from 'react-redux'

import MonthlyIncomeForm from '../components/MonthlyIncomeForm'
import { navigatePop } from '../actions/Navigation'
import { updateBudget } from '../actions/Budgets'

const mapStateToProps = (state) => {
	return {budget: state.budgetState.budget}
}

const mapDispatchToProps = (dispatch) => {
	return {
    endSession: (r) => {
		},
    goBack: () => {
      dispatch(navigatePop());
    },
		updateBudget: (budget) => {
			dispatch(updateBudget(budget));
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MonthlyIncomeForm)
