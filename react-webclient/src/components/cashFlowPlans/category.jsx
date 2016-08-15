import React from 'react';
import BudgetItemList from './budgetItems/budget_item_list';
import classNames from 'classnames';
import loading from '../../assets/images/loading.gif';
const loadingSrc = [window.location.origin, loading].join('/');

export default class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    category: React.PropTypes.object.isRequired,
    expenseFunctions: React.PropTypes.object.isRequired,
    itemFunctions: React.PropTypes.object.isRequired,
    import: React.PropTypes.func.isRequired
  }

  emptyList(budget_items, isLoading) {
    if (!budget_items.length && !isLoading) {
      return <p className='text-center'>You haven't added any budget items yet.</p>
    }
  }

  getList = () => {
    if (this.props.loading) {
      const loadingStyle = {height: '100px', width: '100px', vericalAlign: 'middle'};
      return (
        <div className='text-center' style={{color: '#69F', fontSize: '20px', padding: '50px'}}>
          <img src={loadingSrc} style={loadingStyle} />
          <div>Loading...</div>
        </div>
      )
    } else {
      return <BudgetItemList functions={this.props.itemFunctions}
                             expenseFunctions={this.props.expenseFunctions}
                             budgetItems={this.props.category.budget_items} />
    }
  }

	render() {
    let headerClasses = classNames('row', 'budget-item-labels', {
      hide: this.props.category.budget_items.length === 0
    });
		return (
			<div className='row collapse cash-flow-row'>
        <div className='large-12 medium-12 columns header-row'>
          <h3>
	          {this.props.category.name}
	          <a href='#' onClick={this.props.import} title='Import items from previous budget' name='importCategory' className='right black-color copy-category'>
		          <i className="fi-icon fi-download"></i>
	          </a>
          </h3>
        </div>
        <div className="small-12 large-12 medium-12 columns">
          <ul className="main-budget-categories">
            <li>
              <div className={headerClasses}>
                <div className="large-1 medium-1 large-offset-4 medium-offset-4 columns text-right">
                  Spent
                </div>
                <div className="large-2 medium-2 columns text-right">
                  Budgeted
                </div>
                <div className="large-1 medium-1 columns">
                  Difference
                </div>
                <div className="large-4 medium-4 columns"></div>
              </div>
              {this.emptyList(this.props.category.budget_items, this.props.loading)}
              {this.getList()}
            </li>
          </ul>
        </div>
      </div>
		);
	}
}
