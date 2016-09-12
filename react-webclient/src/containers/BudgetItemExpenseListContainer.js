import {connect} from 'react-redux';
import {newBudgetItemExpense} from '../actions/BudgetItemExpense';
import {filter} from 'lodash';
import ExpenseList from '../components/BudgetItemExpenseList';

const mapStateToProps = (state, ownProps) => {
  const expenses = filter(state.budgetState.budgetItemExpenses, {budget_item_id: ownProps.budgetItemId});
	return {
    expenses
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
		newBudgetItemExpense: (budgetItemId) => {
      dispatch(newBudgetItemExpense(budgetItemId));
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExpenseList)
