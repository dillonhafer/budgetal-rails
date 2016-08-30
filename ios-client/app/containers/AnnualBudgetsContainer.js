import { connect } from 'react-redux'

import AnnualBudget from '../components/AnnualBudget'
import { navigatePush } from '../actions/Navigation'
import { updateBudget, updateBudgetYear, deleteAnnualBudgetItem } from '../actions/AnnualBudgets'

const mapStateToProps = (state) => {
	let year = state.annualBudgetState.year;
	let budget = state.annualBudgetState.budget;
	let budgetItems = state.annualBudgetState.budgetItems;

	return {
		budget, budgetItems, year,
		scrollsToTop: state.navigationState.index === 0
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
		addBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'AnnualBudgetItemForm', title: 'New Budget Item', budgetItem}))
		},
		editBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'AnnualBudgetItemForm', title: `Edit ${budgetItem.name}`, budgetItem}))
		},
    updateBudget: (annualBudget) => {
      dispatch(updateBudget(annualBudget))
    },
		updateBudgetYear: (year) => {
			dispatch(updateBudgetYear(year))
		},
		deleteBudgetItem: (budgetItem) => {
			dispatch(deleteAnnualBudgetItem(budgetItem));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnnualBudget)
