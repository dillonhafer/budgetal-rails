import React from 'react';
import AnnualBudgetItem from './item';

export default class AnnualBudgetItemList extends React.Component {
  constructor(props) {
    super(props);
  }

	budgetItems = () => {
		if (this.props.annual_budget_items.length > 0) {
			return this.list()
		} else {
			return this.empty();
		}
	}

	empty() {
		return (<p className='text-center'>You haven't added any budget items yet.</p>)
	}

	list = () => {
		return (this.props.annual_budget_items.map((budget_item, index) => {
      return (
        <AnnualBudgetItem budgetItem={budget_item} key={index} />
      )
    }))
	}

  render() {
    return (
    	<div className='annual-items-status'>
		    <ul className='large-block-grid-4'>
			    {this.budgetItems()}
	      </ul>
      </div>
    );
  }
}