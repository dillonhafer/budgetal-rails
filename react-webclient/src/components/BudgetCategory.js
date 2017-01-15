import React from 'react';
import classNames from 'classnames';
import BudgetItemListContainer from '../containers/BudgetItemListContainer'
import BudgetCategoryOverviewContainer from '../containers/BudgetCategoryOverviewContainer'
import OverviewContainer from '../containers/OverviewContainer'
import ImportModal from './ImportModal';
import {importCategory} from '../data/BudgetCategory';
const loadingSrc = [window.location.origin, 'loading.gif'].join('/');

import {Row,Col,Modal,Icon} from 'antd';

export default class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budgetCategory: React.PropTypes.object.isRequired,
    hasBudgetItems: React.PropTypes.bool.isRequired,
    importedBudgetItems: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
  }

  _clickImport = (e) => {
    e.preventDefault();
    Modal.confirm({
      okText: `Import ${this.props.budgetCategory.name}`,
      cancelText: "Cancel",
      title: 'Import Budget Items',
      content: `Do you want to import budget items from your previous month's ${this.props.budgetCategory.name} category?`,
      onOk: this._importPreviousItems.bind(this, this.props.budgetCategory.id),
      onCancel() {},
    });
  }

  _importPreviousItems = async (budgetCategoryId) => {
    try {
      const resp = await importCategory(budgetCategoryId);
      if (resp !== null) {
        this.props.importedBudgetItems(resp.imported);
        showMessage(resp.message);
      }
    } catch(err) {
      apiError(err.message)
    }
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
      <Col span={20}>
        <Row>
          <Col span={24}>
            <div className='budget-category-row'>
              <div className='large-12 medium-12 columns header-row'>
                <h3>
                  {this.props.budgetCategory.name}
                  <a href='#' onClick={this._clickImport} title='Import items from previous budget' name='importCategory' className='right black-color copy-category'>
                    <Icon type="export" />
                  </a>
                </h3>
              </div>
              <div className="body-row">
                <ul className="main-budget-categories">
                  <li>
                    {this.emptyList(this.props.hasBudgetItems, this.props.isLoading)}
                    {this.getList(this.props.isLoading)}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className='budget-overview-row'>
              <BudgetCategoryOverviewContainer />
            </div>
          </Col>
          <Col span={12}>
            <div className='budget-overview-row'>
              <OverviewContainer />
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}
