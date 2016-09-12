import React from 'react';
import BudgetItemContainer from '../containers/BudgetItemContainer';
import {map,find} from 'lodash';
import classNames from 'classnames';

export default class BudgetItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItems: React.PropTypes.array.isRequired,
  }

  newBudgetItem = (budgetItem, index) => {
    return <BudgetItemContainer key={index} budgetItem={budgetItem} />
  }

  addBudgetItem = (e) => {
    e.preventDefault();
    this.props.newBudgetItem();
  }

	render() {
    const noNewItems    = find(this.props.budgetItems, (budgetItem) => (budgetItem.id === undefined)) === undefined
    const classes       = classNames('add-item-link tiny button radius', {disabled: !noNewItems})
    const onClickHandle = noNewItems ? this.addBudgetItem : (e) => e.preventDefault();

		return (
			<div className="row new-budget-item">
			  {map(this.props.budgetItems, this.newBudgetItem)}
        <a href='#' onClick={onClickHandle} className={classes} disabled={!noNewItems}>
          <i className='fi-icon fi-plus'></i> Add a Budget Item
        </a>
			</div>
		);
	}
}
