import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AnnualBudgetFormList from './form_list';

describe('AnnualBudgetFormList', () => {
  let list = <AnnualBudgetFormList />
  const component = TestUtils.renderIntoDocument(list);

  it('renders', () => {
    var item = TestUtils.findRenderedComponentWithType(component, AnnualBudgetFormList);
    expect(item).toExist();
  });
});