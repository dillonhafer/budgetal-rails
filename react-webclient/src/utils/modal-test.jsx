import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Modal from './modal';

describe('Modal', () => {
  const component = TestUtils.renderIntoDocument(<Modal title='My Title' hidden={false} cancel={function() {}} content={<div />} modalType='alert' />);

  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, Modal)).toExist();
  });
});