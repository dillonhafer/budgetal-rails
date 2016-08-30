import { connect } from 'react-redux'
import Statistics from '../components/Statistics'
import {updateStats, updateBudgetDate} from '../actions/Statistics'

const mapStateToProps = (state) => {
  const budget = state.statisticsState.budget;
  const budgetCategories = state.statisticsState.budgetCategories;
	return {
    budget, budgetCategories
	}
}

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
    ...ownProps,
    updateStats: (budget) => {
      dispatch(updateStats(budget));
    },
    updateBudgetDate: (year,month) => {
			dispatch(updateBudgetDate(year,month))
		},
 	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Statistics)
