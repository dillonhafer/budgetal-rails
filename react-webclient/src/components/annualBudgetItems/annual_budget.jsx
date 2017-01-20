import React from 'react';
import {browserHistory} from 'react-router';
import {findIndex} from 'lodash';
import {allItems, createItem, updateItem, destroyItem} from '../../data/annual_budget_item';
import AnnualBudgetItemForm from './annualBudgetItemForm';
import classNames from 'classnames';
import AnnualBudgetItemList from './item_list';
import AnnualBudgetFormList from './form_list';
import Confirm from '../../utils/confirm';
import {ensureWindowHeight, availableYears, selectedValue, yearOptions, title, today} from '../../utils/helpers';

import {
  Col,
  Icon,
  Modal,
  Popover,
  Row,
  Select,
} from 'antd';
const Option = Select.Option;

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      selectedBudgetItem: {
        id: 0,
        name: '',
        amount: 10,
        paid: false,
      },
      budget: {
        year: '',
        annual_budget_items: [
          {name: "loading...", amount: 0, paid: false, loading: true}
        ]
      },
      modal: {
        hidden: true,
        budget_item: {name: ''},
        index: -1
      }
    };
  }

  componentDidMount() {
    title(`${this.props.params.year} | Annual Budgets`);
    ensureWindowHeight();
    this._fetchBudget(this.props.params.year);
  }

  confirmDelete = (budget_item, index) => {
    if (!!budget_item.id) {
      this.setState({modal: {hidden: false, budget_item: budget_item, index: index}});
    } else {
      this._budgetItemDeleted(index);
    }
  }

  cancelDelete = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({modal: {hidden: true, index: -1, budget_item: {name: ''}}});
  }

  _fetchBudget(year) {
    allItems(year)
      .then((budget) => {this._budgetFetched(budget)})
      .catch(this._budgetFetchFailed)
  }

  persistBudgetItem = async(annual_budget_item) => {
    try {
      let strategy;
      const status = (annual_budget_item.id > 0) ? 'ANNUAL_BUDGET_ITEM_UPDATED' : 'ANNUAL_BUDGET_ITEM_ADDED';
      switch (status) {
        case 'ANNUAL_BUDGET_ITEM_UPDATED':
          strategy = updateItem;
          break;
        case 'ANNUAL_BUDGET_ITEM_ADDED':
          strategy = createItem;
          break;
      }

      const resp = await strategy(annual_budget_item);
      if (!!resp.errors) {
        showError(prettyServerErrors(resp.errors));
      } else {
        switch (status) {
          case 'ANNUAL_BUDGET_ITEM_UPDATED':
            this.itemUpdated(resp);
            break;
          case 'ANNUAL_BUDGET_ITEM_ADDED':
            this.itemAdded(resp);
            break;
        }
        showMessage(`Saved ${resp.name}`);
        this.handleCancel();
      }
    } catch(err) {
      apiError(err);
    }
  }

  itemUpdated = (item) => {
    let budget = Object.assign({}, this.state.budget, {});
    const idx  = findIndex(budget.annual_budget_items, {'id': item.id});
    budget.annual_budget_items[idx] = item;
    this.setState({budget});
  }

  itemAdded = (item) => {
    let budget = Object.assign({}, this.state.budget, {});
    budget.annual_budget_items.push(item);
    this.setState({budget});
  }

  _saveBudgetItem = (data) => {
    let self = this;
    if (data.annual_budget_item.id === undefined) {
      createItem(data)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            self._saveItemFail(data.index, budget_item.errors)
          } else {
            self._budgetItemSaved(data.index, budget_item)
          }
        })
        .catch(this._budgetFetchFailed)
    } else {
      updateItem(data)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            self._saveItemFail(data.index, budget_item.errors)
          } else {
            self._budgetItemSaved(data.index, budget_item)
          }
        })
        .catch(this._budgetFetchFailed)
    }
  }

  _budgetItemSaved = (index, budget_item) => {
    var budget = this.state.budget;
    budget.annual_budget_items[index] = budget_item;
    this.setState({budget});
    showMessage(`Saved ${budget_item.name}`);
  }

  _saveItemFail = (index, errors) => {
    var budget = this.state.budget;
    budget.annual_budget_items[index].errors = errors;
    this.setState({budget: budget});
  }

  deleteItem = async(item) => {
    try {
      const resp = await destroyItem(item.id);
      if (!!resp.errors) {
        showError(resp.message);
      } else {
        let budget = Object.assign({}, this.state.budget, {});
        const idx  = findIndex(budget.annual_budget_items, {'id': item.id});
        budget.annual_budget_items.splice(idx,1);
        this.setState({budget});
        showMessage(`Deleted ${item.name}`);
      }
    } catch(err) {
      apiError(err);
    }
  }

  _deleteBudgetItem = (e) => {
    e.preventDefault();
    var self  = this;
    var index = this.state.modal.index;
    var item  = this.state.modal.budget_item;

    if (item.id !== undefined) {
      destroyItem(item.id)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            self._budgetFetchFailed(item)
          } else {
            self._budgetItemDeleted(index)
          }
        })
        .catch(this._budgetFetchFailed)
    }
  }

  _budgetItemDeleted = (index) => {
    let budget = this.state.budget
    budget.annual_budget_items.splice(index, 1)
    if (this.state.modal.budget_item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.budget_item.name)
    }
    this.setState({budget: budget})
    this.cancelDelete()
  }

  _budgetFetched = (budget) => {
    this.setState({budget});
  }

  _budgetFetchFailed = (e) => {
    apiError(e);
  }

  changeYear = (year) => {
    browserHistory.push(`/annual-budgets/${year}`)
  }

  showForm = (e) => {
    e.preventDefault()
    this.setState({showForm: true})
  }

  addItem = (e) => {
    e.preventDefault()
    const budget = Object.assign({}, this.state.budget, {});
    budget.annual_budget_items.push({annual_budget_id: budget.id, due_date: today(), name: 'Name', amount: 100});
    this.setState({budget});
  }

  updateForm = (index, updatedBudgetItem) => {
    var budget = this.state.budget;
    budget.annual_budget_items[index] = updatedBudgetItem;
    this.setState({budget});
  }

  handleOnCardClick = (budgetItem) => {
    this.setState({selectedBudgetItem: budgetItem, visible: true});
  }

  handleVisibleChange = (showForm) => {
    this.setState({showForm});
  }

  showNewModal = () => {
    this.setState({selectedBudgetItem: {id: 0, name: '', amount: 0, paid: false}, visible: true});
  }

  handleOnSubmit = (budgetItem) => {
    this.persistBudgetItem(Object.assign({}, budgetItem, {annual_budget_id: this.state.budget.id}))
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  handleOnDeleteClick = (item) => {
    Modal.error({
      className: 'delete-modal',
      title: `Delete ${item.name}?`,
      content: 'Are you sure? This cannot be undone!',
      okText: `Delete ${item.name}`,
      onOk: () => {this.deleteItem(item)}
    });
  }

  render() {
    return (
      <Row className="space-around">
        <Col span={18} offset={3}>
          <div className='header-row'>
            <h3>
              Annual Budget for {this.state.budget.year}
              <Popover
                content={
                  <Select size="large" defaultValue={`${this.state.budget.year}`} style={{width: '100%'}} onChange={this.changeYear}>
                    {
                      availableYears().map(year => {
                        return <Option key={year} value={year.toString()}>{year}</Option>;
                      })
                    }
                  </Select>
                }
                title="Change Budget Year"
                placement="leftTop"
                trigger="click"
                visible={this.state.showForm}
                onVisibleChange={this.handleVisibleChange}>
                <a href="#" onClick={this.showForm} className="right">
                  <Icon type="calendar" />
                </a>
              </Popover>
            </h3>
          </div>
          <div className="body-row">
            <AnnualBudgetItemList annualBudgetItems={this.state.budget.annual_budget_items}
                                  onClick={this.showNewModal}
                                  handleOnCardClick={this.handleOnCardClick}
                                  handleOnDeleteClick={this.handleOnDeleteClick} />
            <Modal title="Annual Budget Item"
                   width={300}
                   className="no-modal-footer"
                   visible={this.state.visible}
                   onCancel={this.handleCancel}>
              <AnnualBudgetItemForm budgetItem={this.state.selectedBudgetItem} handleOnSubmit={this.handleOnSubmit} />
            </Modal>
          </div>
        </Col>
      </Row>
    );
  }
}
