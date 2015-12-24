import React from 'react';
import AnnualBudgetItem from './item';
import _ from 'lodash';

export default class AnnualBudgetItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    annualBudgetItems: React.PropTypes.array.isRequired
  }

	budgetItems(items) {
    if (_.isEmpty(items)) {
      return <p className='text-center'>You haven't added any budget items yet.</p>;
    } else {
			return this.buildList(items);
		}
	}

	buildList(budgetItems) {
		return (budgetItems.map((budgetItem, index) => {
      return (
        <AnnualBudgetItem budgetItem={budgetItem} key={index} />
      )
    }))
	}

  render() {
    return (
    	<div className='annual-items-status'>
		    <ul className='large-block-grid-4'>
			    {this.budgetItems(this.props.annualBudgetItems)}
	      </ul>
      </div>
    );
  }
}