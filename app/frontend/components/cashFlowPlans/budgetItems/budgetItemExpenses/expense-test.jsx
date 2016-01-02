import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Expense from './expense';

describe('Expense', () => {
  let f = function(){};
  let expense     = {name: 'Amazon', amount: 12.12, date: '2015-03-12'}
  let expenseForm = <Expense expense={expense} save={f} update={f} delete={f}  />
  var markup      = ReactDOMServer.renderToStaticMarkup(expenseForm);
  const component = TestUtils.renderIntoDocument(expenseForm);

  it('renders', () => {
    var item = TestUtils.findRenderedComponentWithType(component, Expense);
    expect(item).toExist();
  });

  var inputs = [
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