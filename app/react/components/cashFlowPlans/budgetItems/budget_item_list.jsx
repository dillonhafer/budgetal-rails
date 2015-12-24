import React from 'react';
import BudgetItem from './budget_item';

export default class BudgetItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetItems: React.PropTypes.array.isRequired,
    functions: React.PropTypes.object.isRequired,
    expenseFunctions: React.PropTypes.object.isRequired
  }

  state = { hideExpenses: true }

	budgetItems = () => {
		return (this.props.budgetItems.map((budget_item, index) => {
      return (
        <BudgetItem index={index}
        						key={index}
						        budgetItem={budget_item}
        						save={this.props.functions.save}
        						update={this.props.functions.update}
						        delete={this.props.functions.delete}
                    expenseFunctions={this.props.expenseFunctions} />
      )
    }))
	}

	render() {
		return (
			<div className="row new-budget-item">
			 {this.budgetItems()}
				<a href='#' onClick={this.props.functions.add} className='add-item-link tiny button radius'>
          <i className='fi-icon fi-plus'></i> Add a budget item
        </a>
			</div>
		);
	}
}