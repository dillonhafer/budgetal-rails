import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Confirm from '../confirm';

describe('Confirm', () => {
  const component = TestUtils.renderIntoDocument(<Confirm name='Test Name' hidden={false} delete={function() {}} cancel={function() {}}/>);

  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, Confirm)).toExist();
  });
});