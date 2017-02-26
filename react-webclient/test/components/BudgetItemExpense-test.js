import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';

import { renderComponent , expect } from '../test_helper';
import Expense from '../../src/components/BudgetItemExpense';

describe('BudgetItemExpense', () => {
  let component;
  const expense = {
    name: 'Amazon',
    amount: 12.12,
    date: '2015-03-12'
  };

  beforeEach(() => {
    component = renderComponent(Expense.DateCell, {expense: expense});
  });

  it('displays a date field', () => {
    expect(component.find('.ant-calendar-picker input')).to.exist;
  });
});
