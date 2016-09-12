import React from 'react';
import classNames from 'classnames';
import loading from '../assets/images/loading.gif';
import BudgetItemListContainer from '../containers/BudgetItemListContainer'
import BudgetCategoryOverviewContainer from '../containers/BudgetCategoryOverviewContainer'
import OverviewContainer from '../containers/OverviewContainer'
import ImportModal from './ImportModal';
import {importCategory} from '../data/BudgetCategory';
const loadingSrc = [window.location.origin, loading].join('/');

export default class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      importHidden: true,
    }
  }

  static propTypes = {
    budgetCategory: React.PropTypes.object.isRequired,
    hasBudgetItems: React.PropTypes.bool.isRequired,
    importedBudgetItems: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
  }

  _clickImport = (e) => {
    e.preventDefault();
    this.setState({importHidden: false});
  }

  _cancelImport = () => {
    this.setState({importHidden: true});
  }

  _importPreviousItems = async (budgetCategoryId) => {
    try {
      const resp = await importCategory(budgetCategoryId);
      if (resp !== null) {
        this.props.importedBudgetItems(resp.imported);
        showMessage(resp.message);
        this._cancelImport();
      }
    } catch(err) {
      apiError(err.message)
    }
  }

  _import = (e) => {
    e.preventDefault();
    this._importPreviousItems(this.props.budgetCategory.id)
  }

  emptyList(hasBudgetItems, isLoading) {
    if (!hasBudgetItems && !isLoading) {
      return <p className='text-center'>You haven't added any budget items yet.</p>
    }
  }

  getList(isLoading) {
    if (isLoading) {
      const loadingStyle = {height: '100px', width: '100px', vericalAlign: 'middle'};
      return (
        <div className='text-center' style={{color: '#69F', fontSize: '20px', padding: '50px'}}>
          <img src={loadingSrc} style={loadingStyle} />
          <div>Loading...</div>
        </div>
      )
    } else {
      return <BudgetItemListContainer />
    }
  }

  render() {
    const headerClasses = classNames('row', 'budget-item-labels', {hide: !this.props.hasBudgetItems});

    return (
      <div className='large-10 medium-10 columns hide-for-small-down'>
        <div className='row collapse cash-flow-row'>
          <div className='large-12 medium-12 columns header-row'>
            <h3>
              {this.props.budgetCategory.name}
              <a href='#' onClick={this._clickImport} title='Import items from previous budget' name='importCategory' className='right black-color copy-category'>
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
                {this.emptyList(this.props.hasBudgetItems, this.props.isLoading)}
                {this.getList(this.props.isLoading)}
              </li>
            </ul>
          </div>
          <ImportModal category={this.props.budgetCategory}
                       hidden={this.state.importHidden}
                       import={this._import}
                       cancel={this._cancelImport} />
        </div>

        <div className='row collapse cash-flow-row overviews'>
          <BudgetCategoryOverviewContainer />
          <OverviewContainer />
        </div>
      </div>
    );
  }
}
