import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AnnualBudgetItem from './item';

describe('AnnualBudgetItem', () => {
  let budgetItem  = {name: 'Amazon', amount: 12.12, due_date: '2015-3-12', paid: true}
  var markup      = ReactDOMServer.renderToStaticMarkup(<AnnualBudgetItem budgetItem={budgetItem} />);
  const component = TestUtils.renderIntoDocument(<AnnualBudgetItem budgetItem={budgetItem} />);

  it('renders', () => {
    var item = TestUtils.findRenderedComponentWithType(component, AnnualBudgetItem);
    expect(item).toExist();
  });

  it('has a pretty title', () => {
    expect(markup).toContain('<li class="title">Amazon</li>');
  });

  it('has a formatted amount', () => {
    expect(markup).toContain('<li class="price">$12.12</li>');
  });

  it('has a formatted due date', () => {
    expect(markup).toContain('<li class="description"><b>Due:</b> March 12, 2015</li>');
  });

  it('has an amount per month', () => {
    expect(markup).toContain('<li class="bullet-item">$1.01 / month</li>');
  });

  it('has the correct paid label', () => {
    expect(markup).toContain('<li class="bullet-item"><span class="label radius success">Paid</span></li>');
  });
});