import React from 'react';
import Expense from './expense';
import _ from 'lodash';

export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
		expenses: []
  }

  static propTypes = {
		expenses: React.PropTypes.array.isRequired,
	  functions: React.PropTypes.object.isRequired
  }

	add = (e) => {
		e.preventDefault();
		this.props.functions.add(this.props.budgetItemId);
	}

	headerRow = () => {
		if (this.props.expenses.length) {
			return (
				<div className='row expense-header-row'>
				  <div className="large-2 medium-2 columns"><label>Date</label></div>
				  <div className="large-2 medium-2 columns"><label>Name</label></div>
				  <div className="large-2 medium-2 columns"><label>Amount</label></div>
				  <div className='large-6 medium-6 columns'></div>
				</div>
			)
		}
	}

	expenses = () => {
		if (this.props.expenses.length) {
			return (
				_.map(this.props.expenses, (expense, index) => {
		      return (
		        <Expense index={index}
								     key={index}
								     expense={expense}
		      					 save={this.props.functions.save}
		      					 update={this.props.functions.update}
							       delete={this.props.functions.delete} />
		      )}
	      )
      )
		} else {
			return(<p className='no-expenses'>You haven't added any expenses yet</p>)
		}
	}

	render() {
		return (
			<div className={this.props.className}>
				<div className="fields">
					{this.headerRow()}
					{this.expenses()}
				  <div className='add-expense-link-row'>
					  <a href='#' onClick={this.add} className='add-expense-link tiny button radius success'>
						  <i className='fi-icon fi-plus'></i> Add an expense
					  </a>
				  </div>
				</div>
			</div>
		);
	}
}