import { connect } from 'react-redux'

import AnnualBudget from '../components/AnnualBudget'
import { navigatePush } from '../actions'
import { updateBudget, updateBudgetYear, updateAnnualBudgetItem, deleteAnnualBudgetItem } from '../annualBudgetActions'

const mapStateToProps = (state) => {
	let year = state.annualBudgetState.year;
	let budgetItems = state.annualBudgetState.budgetItems;

	return {
		budgetItems, year,
		scrollsToTop: state.navigationState.index === 0
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    signOut: (r) => {
		},
		addBudgetItem: (budgetItem) => {
			dispatch(navigatePush({key: 'AnnualBudgetItemForm', title: 'New Annual Budget Item', budgetItem}))
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
