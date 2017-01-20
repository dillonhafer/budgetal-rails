import { connect } from 'react-redux'
import Expense from '../components/BudgetItemExpense';
import {
  saveBudgetItemExpense,
  updateBudgetItemExpense,
  deleteBudgetItemExpense,
} from '../actions/BudgetItemExpense'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    ...ownProps,
    saveBudgetItemExpense: (budgetItemExpense) => {
      dispatch(saveBudgetItemExpense(budgetItemExpense));
    },
		updateBudgetItemExpense: (budgetItemExpense) => {
      dispatch(updateBudgetItemExpense(budgetItemExpense));
		},
		deleteBudgetItemExpense: (budgetItemExpense) => {
			dispatch(deleteBudgetItemExpense(budgetItemExpense));
		}
	}
}

export const DateCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense.DateCell);

export const AmountCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense.AmountCell);

export const ActionCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense.ActionCell);

export const NameCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense.NameCell);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Expense)
