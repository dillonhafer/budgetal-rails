import { renderComponent , expect } from '../test_helper';
import Expense from '../../src/components/BudgetItemExpense';

describe('BudgetItemExpense', () => {
  let dateCell, nameCell, amountCell;
  const expense = {
    name: 'Amazon',
    amount: 12.12,
    date: '2015-03-12'
  };

  beforeEach(() => {
    dateCell   = renderComponent(Expense.DateCell,   {expense: expense});
    nameCell   = renderComponent(Expense.NameCell,   {expense: expense});
    amountCell = renderComponent(Expense.AmountCell, {expense: expense});
  });

  it('displays a date field', () => {
    expect(dateCell.find('.ant-calendar-picker input').val()).toEqual("2015-03-12");
  });

  it('displays a name field', () => {
    expect(nameCell.find('.ant-select-search__field').val()).toEqual("Amazon");
  });

  it('displays an auto-complete field', () => {
    expect(nameCell.find('.ant-select-search__field').val()).toEqual("Amazon");
  });

  it('displays an amount field', () => {
    expect(amountCell.find('input[name="expense_amount"]').val()).toEqual("12.12");
  });
});
