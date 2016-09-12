import { connect } from 'react-redux'
import BudgetItem from '../components/BudgetItem';
import {
  saveBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from '../actions/BudgetItem'
import {filter,reduce,round} from 'lodash'

const mapStateToProps = (state, ownProps) => {
  const expenses = filter(state.budgetState.budgetItemExpenses, {budget_item_id: ownProps.budgetItem.id});
  const amountSpent = reduce(expenses, (total, expense, index) => {
    const sum = parseFloat(total) + parseFloat(expense.amount);
    return round(sum, 2);
  }, 0.00);

  const amountRemaining = ownProps.budgetItem.amount_budgeted - amountSpent;

  return {
    amountSpent, amountRemaining
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
    saveBudgetItem: (budgetItem) => {
      dispatch(saveBudgetItem(budgetItem));
    },
		updateBudgetItem: (budgetItem) => {
      dispatch(updateBudgetItem(budgetItem));
		},
		deleteBudgetItem: (budgetItem) => {
			dispatch(deleteBudgetItem(budgetItem));
		},

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BudgetItem)
