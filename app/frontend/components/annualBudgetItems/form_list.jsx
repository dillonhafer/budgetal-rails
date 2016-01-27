import React from 'react';
import {allItems, createItem, updateItem, destroyItem} from '../../data/annual_budget_item';
import AnnualBudgetItemForm from './item_form';

export default class AnnualBudgetFormList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    annualBudgetItems: React.PropTypes.array.isRequired,
    addItem: React.PropTypes.func.isRequired,
    updateForm: React.PropTypes.func.isRequired,
    saveForm: React.PropTypes.func.isRequired,
    delete: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    annualBudgetItems: [],
    addItem: function() {},
    updateForm: function() {},
    saveForm: function() {},
    delete: function() {}
  }

	buildForms(budgetItems) {
		return (budgetItems.map((budgetItem, index) => {
      return (
        <AnnualBudgetItemForm index={index}
											        budgetItem={budgetItem}
											        key={index}
											        updateForm={this.props.updateForm}
											        saveForm={this.props.saveForm}
											        deleteForm={this.props.delete} />
      )
    }))
	}

  render() {
    return (
    	<div>
	    	<h4>Manage Budget Items</h4>
	      <hr />
	      <div className='row'>
	        <div className='large-4 columns'>Name</div>
	        <div className='large-2 columns'>Amount</div>
	        <div className='large-2 columns'>Due Date</div>
	        <div className='large-1 columns text-center'>Paid?</div>
	        <div className='large-3 columns'></div>
	      </div>

	      <div className='annual-items-forms'>
          {this.buildForms(this.props.annualBudgetItems)}
          <a href='#' onClick={this.props.addItem} className='tiny button radius add-nested-item'><i className='fi-icon fi-plus'></i> Add an Item</a>
        </div>
      </div>
    );
  }
}
