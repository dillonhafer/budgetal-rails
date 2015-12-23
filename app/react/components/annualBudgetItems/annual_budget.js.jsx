import React from 'react';
import _ from 'lodash';
import {allItems, createItem, updateItem, destroyItem} from '../../data/annual_budget_item';
import classNames from 'classnames';
import AnnualBudgetItemList from './item_list';
import AnnualBudgetFormList from './form_list';
import Confirm from '../confirm';

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    didFetchData: false,
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

  confirmDelete = (budget_item, index) => {
    if (!!budget_item.id) {
      this.setState({modal: {hidden: false, budget_item: budget_item, index: index}});
    } else {
      this._budgetItemDeleted(index)
    }
  }

  cancelDelete = (e) => {
    if (e) {
      e.preventDefault()
    }
    this.setState({modal: {hidden: true, index: -1, budget_item: {name: ''}}});
  }

  componentDidMount() {
    this._fetchBudget({year: this.yearParam()})
  }

  successMessage(item_name) {
    showMessage("Updated "+item_name)
  }

  _fetchBudget(data) {
    allItems(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  }

  _saveBudgetItem = (data) => {
    if (data.annual_budget_item.id === undefined) {
      createItem(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.annual_budget_item))
    } else {
      updateItem(data)
        .done(this._budgetItemSaved.bind(null, data.index))
        .fail(this._saveItemFail.bind(null, data.annual_budget_item))
    }
  }

  _budgetItemSaved = (index, budget_item, err) => {
    let budget = this.state.budget
    budget.annual_budget_items[index] = budget_item
    this.setState({budget: budget})
    showMessage("Saved "+budget_item.name)
  }

  _saveItemFail = (index, xhr, status, err) => {
    var errors = JSON.parse(xhr.responseText).errors
    let budget = this.state.budget
    for(idx in budget.annual_budget_items) {
      budget_item = budget.annual_budget_items[idx]
      if (budget_item.id == index.id) {
        budget.annual_budget_items[idx].errors = errors
      }
    }
    this.setState({budget: budget})
  }

  _deleteBudgetItem = (e) => {
    e.preventDefault();
    if (this.state.modal.budget_item.id !== undefined) {
      destroyItem(this.state.modal.budget_item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.budget_item))
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

  _fetchDataDone = (data, textStatus, jqXHR) => {
    this.setState({
      didFetchData: true,
      budget: data
    })
  }

  _fetchDataFail(xhr, status, err) {
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

  changeYear = () => {
    var s = document.querySelector('#annual_budget_year')
    var year = s.options[s.selectedIndex].value;
    history.pushState({}, 'Budgetal', year)
    document.title = `${year} | Budgetal`
    this._fetchBudget({year: year})
    this.setState({showForm: false})
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
    var budget = this.state.budget
    budget.annual_budget_items.push({annual_budget_id: budget.id})
    this.setState({budget: budget})
  }

  updateForm = (index, updatedBudgetItem) => {
    this.state.budget.annual_budget_items[index] = updatedBudgetItem
    this.setState({budget: this.state.budget})
  }

  yearOptions() {
    let minYear = 2015;
    let maxYear = (new Date).getFullYear() + 3;
    let years = _.range(minYear, maxYear);
    return _.map(years, (year, index) => {
      return (<option key={index} value={year}>{year}</option>);
    });
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
                {this.yearOptions()}
              </select>
            </p>
          </span>
        </div>
        <div className="small-12 large-12 columns">
          <ul className="main-budget-categories main-annual-budget">
            <li>
              <AnnualBudgetItemList annual_budget_items={this.state.budget.annual_budget_items} />
              <AnnualBudgetFormList annual_budget_items={this.state.budget.annual_budget_items}
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
