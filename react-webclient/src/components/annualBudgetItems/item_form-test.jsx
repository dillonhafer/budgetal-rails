import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AnnualBudgetItemForm from './item_form';

describe('AnnualBudgetItemForm', () => {
  let f = function(){};
  let budgetItem  = {name: 'Amazon', amount: 12.12, due_date: '2015-03-12', paid: true}
  let itemForm    = <AnnualBudgetItemForm budgetItem={budgetItem} updateForm={f} deleteForm={f} saveForm={f}  />
  var markup      = ReactDOMServer.renderToStaticMarkup(itemForm);
  const component = TestUtils.renderIntoDocument(itemForm);

  it('renders', () => {
    var item = TestUtils.findRenderedComponentWithType(component, AnnualBudgetItemForm);
    expect(item).toExist();
  });

  var inputs = [
    {args: 12.12, name: 'amount'},
    {args: 'Amazon', name: 'name'},
    {args: '2015-03-12', name: 'due_date'}
  ]

  inputs.forEach(function(test) {
    it(`has an input of ${test.name} with the value ${test.args}`, () => {
      expect(markup).toContain(`value="${test.args}"`);
    });
  });
});