import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AnnualBudgetItemList from './item_list';

describe('AnnualBudgetItemList', () => {
  let list = <AnnualBudgetItemList annualBudgetItems={[]} />
  const component = TestUtils.renderIntoDocument(list);

  it('renders', () => {
    var item = TestUtils.findRenderedComponentWithType(component, AnnualBudgetItemList);
    expect(item).toExist();
  });

  describe('With budget items', () => {
    let item   = {name: 'Amazon', amount: 12.12, due_date: '2015-3-12', paid: true}
    let list   = <AnnualBudgetItemList annualBudgetItems={[item]} />
    var markup = React.renderToStaticMarkup(list);

    it('shows an item list', () => {
      expect(markup).toContain('<ul class="pricing-table">');
    });

    it('does not show an empty message', () => {
      expect(markup).toNotContain("You haven&#x27;t added any budget items yet.");
    });
  });

  describe('Without budget items', () => {
    var empty_list = <AnnualBudgetItemList annualBudgetItems={[]} />
    var markup     = React.renderToStaticMarkup(empty_list);

    it('shows an empty message', () => {
      expect(markup).toContain("You haven&#x27;t added any budget items yet.");
    });
  });
});