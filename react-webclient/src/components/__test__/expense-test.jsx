import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import BudgetItemExpense from '../BudgetItemExpense';

describe('BudgetItemExpense', () => {
  const expense     = {name: 'Amazon', amount: 12.12, date: '2015-03-12'}
  const expenseForm = <BudgetItemExpense expense={expense} />
  const markup      = ReactDOMServer.renderToStaticMarkup(expenseForm);
  const component = TestUtils.renderIntoDocument(expenseForm);

  it('renders', () => {
    const item = TestUtils.findRenderedComponentWithType(component, BudgetItemExpense);
    expect(item).toExist();
  });

  const inputs = [
    {args: 12.12, name: 'amount'},
    {args: 'Amazon', name: 'name'},
    {args: '2015-03-12', name: 'date'}
  ]

  inputs.forEach(function(test) {
    it(`has an input of ${test.name} with the value ${test.args}`, () => {
      expect(markup).toContain(`value="${test.args}"`);
    });
  });
});