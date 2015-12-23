import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import Confirm from './confirm';

describe('Confirm', () => {
  const component = TestUtils.renderIntoDocument(<Confirm name='Test Name' hidden={false} delete={function() {}} cancel={function() {}}/>);

  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, Confirm)).toExist();
  });
});
