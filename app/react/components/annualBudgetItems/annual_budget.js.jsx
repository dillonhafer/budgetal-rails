import React from 'react';
import _ from 'lodash';
import {allItems, createItem, updateItem, destroyItem} from '../../data/annual_budget_item';
import classNames from 'classnames';
import AnnualBudgetItemList from './item_list';
import AnnualBudgetFormList from './form_list';
import Confirm from '../confirm';
import {selectedValue, yearOptions} from '../../utils/helpers';

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showForm: false,
    budget: {
      year: '',
      annual_budget_items: []
    },
    modal: {
      hidden: true,
      budget_item: {name: ''},
      index: -1
    }
  }

  componentDidMount() {
    let year = this.yearParam();
    this._fetchBudget(year);
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
    let self = this;
    allItems(year)
      .then((r) => r.json())
        .then((budget) => {self._budgetFetched(budget)})
      .catch(this._budgetFetchFailed)
  }

  _saveBudgetItem = (data) => {
    if (data.annual_budget_item.id === undefined) {
      createItem(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.index))
    } else {
      updateItem(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.index))
    }
  }

  _budgetItemSaved = (index, budget_item, err) => {
    var budget = this.state.budget;
    budget.annual_budget_items[index] = budget_item;
    this.setState({budget});
    showMessage(`Saved ${budget_item.name}`);
  }

  _saveItemFail = (index, xhr, status, err) => {
    var errors = JSON.parse(xhr.responseText).errors;
    var budget = this.state.budget;

    budget.annual_budget_items[index].errors = errors;
    this.setState({budget: budget});
  }

  _deleteBudgetItem = (e) => {
    e.preventDefault();
    if (this.state.modal.budget_item.id !== undefined) {
      destroyItem(this.state.modal.budget_item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._budgetFetchFailed.bind(null, this.state.modal.budget_item))
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
    this.setState({budget})
  }

  _budgetFetchFailed(xhr, status, err) {
    var errors = JSON.parse(xhr.responseText).errors
    for (idx in errors) {
      var msg = errors[idx]
      showMessage(msg)
    }
  }

  yearParam() {
    var pathNames = window.location.pathname.split('/')
    var yearIndex = pathNames.length - 1
    return pathNames[yearIndex]
  }

  _updateWindow(year) {
    var title = `${year} | Budgetal`;
    history.pushState({title}, 'Budgetal', year);
    document.title = title;
  }

  changeYear = () => {
    var year = selectedValue('#annual_budget_year');
    this._updateWindow(year);
    this._fetchBudget(year);
    this.hideYearForm();
  }

  hideYearForm = () => {
    this.setState({showForm: false})
  }

  showForm = (e) => {
    e.preventDefault()
    this.setState({showForm: true})
    setTimeout(function() {
      document.querySelector('#annual_budget_year').focus()
    },100)
  }

  addItem = (e) => {
    e.preventDefault()
    var budget = this.state.budget;
    budget.annual_budget_items.push({annual_budget_id: budget.id});
    this.setState({budget});
  }

  updateForm = (index, updatedBudgetItem) => {
    var budget = this.state.budget;
    budget.annual_budget_items[index] = updatedBudgetItem;
    this.setState({budget});
  }

  render() {
    let formClasses = classNames({
      'tooltip annual-budget-tooltip animate': true,
      fadeInUpBig2: this.state.showForm,
      hide: !this.state.showForm
    });
    return (
      <div>
        <div className='large-12 columns header-row'>
          <h3>
            Annual Budget for {this.state.budget.year}
            <a href='#' onClick={this.showForm} className='right black-color'><i className='fi-icon fi-calendar'></i></a>
          </h3>
          <span className={formClasses}>
            <p>
              <label htmlFor="annual_budget_year">Change Budget Year</label>
              <select id="annual_budget_year" name='annual_budget_year' value={this.state.budget.year} onBlur={this.hideYearForm} onChange={this.changeYear}>
                {yearOptions()}
              </select>
            </p>
          </span>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories main-annual-budget">
            <li>
              <AnnualBudgetItemList annualBudgetItems={this.state.budget.annual_budget_items} />
              <AnnualBudgetFormList annualBudgetItems={this.state.budget.annual_budget_items}
                                    openModal={this.openModal}
                                    addItem={this.addItem}
                                    updateForm={this.updateForm}
                                    saveForm={this._saveBudgetItem}
                                    delete={this.confirmDelete} />
            </li>
          </ul>
        </div>
        <Confirm name={this.state.modal.budget_item.name}
                 hidden={this.state.modal.hidden}
                 cancel={this.cancelDelete}
                 delete={this._deleteBudgetItem} />
      </div>
    );
  }
}
