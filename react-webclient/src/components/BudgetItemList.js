import React from 'react';
import BudgetItemContainer from '../containers/BudgetItemContainer';
import {map,find} from 'lodash';
import classNames from 'classnames';

import { Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class BudgetItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'tab0'
    }
  }

  static propTypes = {
    budgetItems: React.PropTypes.array.isRequired,
  }

  newBudgetItem = (budgetItem, index) => {
    return (
      <TabPane tab={budgetItem.name} key={'tab'+index}>
        <BudgetItemContainer budgetItem={budgetItem} />
      </TabPane>
    );
  }

  addBudgetItem = (e) => {
    e.preventDefault();
    this.props.newBudgetItem();
    this.setState({activeKey: 'tab'+this.props.budgetItems.length})
  }

  onTabChange = (activeKey) => {
    this.setState({activeKey});
  }

	render() {
    const noNewItems    = find(this.props.budgetItems, (budgetItem) => (budgetItem.id === undefined)) === undefined
    const onClickHandle = noNewItems ? this.addBudgetItem : (e) => e.preventDefault();

		return (
			<div className="row new-budget-item">
        <Tabs tabPosition="left"
          onChange={this.onTabChange}
          activeKey={this.state.activeKey}>
          {map(this.props.budgetItems, this.newBudgetItem)}
        </Tabs>
        <br />
        <Button icon='plus-circle'
          onClick={onClickHandle}
          type='primary'
          size='large'
          disabled={!noNewItems}>
          Add a Budget Item
        </Button>
			</div>
		);
	}
}
