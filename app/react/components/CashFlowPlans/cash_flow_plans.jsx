import React from 'react';
import CategoryList from './category_list';
import Category from './category';
import CategoryOverview from './category_overview';
import Overview from './overview';
import ImportModal from './import_modal';
import Confirm from '../Utils/confirm';

import BudgetController from '../Data/budget_controller';
import {find, importCategory} from '../Data/budget_category_controller';
import BudgetItemController from '../Data/budget_item_controller';
import BudgetItemExpenseController from '../Data/budget_item_expense_controller';

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
    this._fetchDataDone = this._fetchDataDone.bind(this)
    this.state = {
      didFetchData: false,
      showForm: false,
      budget: {
        budget_categories: []
      },
      category: {
        id: '',
        name: '',
        amount: '',
        budget_items: []
      },
      importHidden: true,
      modal: {
        hidden: true,
        item: {name: ''},
        index: -1,
        delete: function(){}
      }
    };
  }

  confirmItemDelete(budget_item, index) {
    if (!!budget_item.id) {
      this.setState({
        modal: {
          hidden: false,
          item: budget_item,
          index: index,
          delete: this.deleteBudgetItem
        }
      });
    } else {
      this._budgetItemDeleted(index)
    }
  }

  confirmExpenseDelete(expense, index) {
    if (!!expense.id) {
      this.setState({
        modal: {
          hidden: false,
          item: expense,
          index: index,
          delete: this.deleteExpense
        }
      });
    } else {
      this._expenseDeleted(expense.budget_item_id, index)
    }
  }

  cancelDelete(e) {
    if (e) { e.preventDefault() }
    this.setState({modal: {hidden: true, index: -1, item: {name: ''}, delete: function(){}}});
  }

  urlParams() {
    var pathNames  = window.location.pathname.split('/');
    var yearIndex  = pathNames.length - 2;
    var monthIndex = pathNames.length - 1;
    return {month: pathNames[monthIndex], year: pathNames[yearIndex]};
  }

  changeBudget() {
    var year  = selectedValue('#budget_year');
    var month = selectedValue('#budget_month');

    document.title = `${monthName(month)} ${year} | Budgetal`;
    history.pushState({}, 'Budgetal', `/cash-flow-plans/${year}/${month}`);
    this._fetchBudget({year: year, month: month});
  }

  showForm(e) {
    e.preventDefault();
    this.setState({showForm: true});
  }

  componentDidMount() {
    let budgetParams = Object.assign({}, this.urlParams(), {id: this.props.id});
    this._fetchBudget(budgetParams);
  }

  _fetchDataDone(data, textStatus, jqXHR) {
    this.setState({
      didFetchData: true,
      budget: data.budget,
      category: data.budget_category
    });
  }

  _fetchDataFail(xhr, status, err) {
    var errors = JSON.parse(xhr.responseText).errors
    for (idx in errors) {
      var msg = errors[idx]
      showMessage(msg)
    }
  }

  changeCategory(id) {
    this._fetchBudget({
      year: this.budget.year,
      month: this.budget.month,
      id: id
    })
  }

  _fetchBudget(data) {
    find(data)
      .done(this._fetchDataDone)
      .fail(this._fetchDataFail)
  }

  // Budget Item functions
  saveBudgetItem(item) {
    var data = {
      budget_category_id: this.state.category.id,
      budget_item: item
    }
    if (item.id === undefined) {
      BudgetItemController.create(data)
        .done(this._budgetItemSaved.bind(null, item.index))
        .fail(this._saveItemFail.bind(null, item))
    } else {
      BudgetItemController.update(item)
        .done(this._budgetItemSaved.bind(null, item.index))
        .fail(this._saveItemFail.bind(null, item))
    }
  }

  _budgetItemSaved(index, budget_item, err) {
    let category = this.state.category
    let budget = _.assign({}, this.state.budget, budget_item.budget)

    budget_item.budget_item_expenses = category.budget_items[index].budget_item_expenses || []
    category.budget_items[index] = budget_item

    this.setState({category: category, budget: budget})
    showMessage(`Saved ${budget_item.name}`)
  }

  _saveItemFail(index, xhr, status, err) {
    let errors = JSON.parse(xhr.responseText).errors
    let category = this.state.category
    _.where(category.budget_items, {'index': index.index})[0].errors = errors
    this.setState({category: category})
  }

  deleteBudgetItem(e) {
    e.preventDefault();
    if (this.state.modal.item.id !== undefined) {
      BudgetItemController.destroy(this.state.modal.item.id)
        .done(this._budgetItemDeleted(this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.item))
    }
  }

  _budgetItemDeleted(index) {
    let category = this.state.category
    category.budget_items.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  }

  addBudgetItem(e) {
    e.preventDefault()
    var category = this.state.category
    category.budget_items.push({category_id: category.id, amount_budgeted: 0.00})
    this.setState({category: category})
  }

  updateBudgetItem(index, updatedBudgetItem) {
    var category = this.state.category
    category.budget_items[index] = updatedBudgetItem
    this.setState({category: category})
  }

  updateBudget(budget) {
    let current = _.assign({}, this.state.budget, budget)
    current.monthly_income = budget.monthly_income
    this.setState({budget: budget})
  }

  saveBudget(budget) {
    BudgetController.update(budget)
      .done(this._budgetUpdated)
      .fail(this._saveBudgetFail.bind(null, budget))
  }

  _saveBudgetFail(index, xhr, status, err) {
    let errors = JSON.parse(xhr.responseText).errors
    let budget = this.state.budget
    budget.errors = errors
    this.setState({budget: budget})
  }

  _budgetUpdated(xhr, status, err) {
    this.setState({budget: xhr.budget})
  }

  // Budget Item Expense functions
  addExpense(id) {
    var category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': id})[0]
    budget_item.budget_item_expenses.push({budget_item_id: id, amount: 0.00})
    this.setState({category: category})
  }

  saveExpense(expense) {
    if (expense.id === undefined) {
      BudgetItemExpenseController.create(expense)
        .done(this._expenseSaved.bind(null, expense.index))
        .fail(this._saveExpenseFail.bind(null, expense))
    } else {
      BudgetItemExpenseController.update(expense)
        .done(this._expenseSaved.bind(null, expense.index))
        .fail(this._saveExpenseFail.bind(null, expense))
    }
  }

  _saveExpenseFail(index, xhr, status, err) {
    let errors = JSON.parse(xhr.responseText).errors
    let category = this.state.category
    let budget_item = _.where(category.budget_items, {'id': index.budget_item_id})[0]
    _.where(budget_item.budget_item_expenses, {'index': index.index})[0].errors = errors
    this.setState({category: category})
  }

  _expenseSaved(index, expense, err) {
    let category = this.state.category
    let budget = _.assign({}, this.state.budget, expense.budget)
    var budget_item = _.where(category.budget_items, {'id': expense.budget_item_id})[0]

    budget_item.budget_item_expenses[index] = expense
    this.setState({category: category, budget: budget})
    showMessage(`Saved ${expense.name}`)
  }

  updateExpense(index, updatedExpense) {
    var category    = this.state.category
    var budget_item = _.where(category.budget_items, {'id': updatedExpense.budget_item_id})[0]
    budget_item.budget_item_expenses[index] = updatedExpense
    this.setState({category: category})
  }

  deleteExpense(e) {
    e.preventDefault();
    if (this.state.modal.item.id !== undefined) {
      BudgetItemExpenseController.destroy(this.state.modal.item.id)
        .done(this._expenseDeleted(this.state.modal.item.budget_item_id, this.state.modal.index))
        .fail(this._fetchDataFail.bind(null, this.state.modal.item))
    }
  }

  _expenseDeleted(budget_item_id, index) {
    let category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': budget_item_id})[0]
    budget_item.budget_item_expenses.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  }

  itemFunctions() {
    return {
      add: this.addBudgetItem,
      save: this.saveBudgetItem,
      update: this.updateBudgetItem,
      delete: this.confirmItemDelete
    }
  }

  expenseFunctions() {
    return {
      add: this.addExpense,
      save: this.saveExpense,
      update: this.updateExpense,
      delete: this.confirmExpenseDelete
    }
  }

  import(e) {
    e.preventDefault();
    importCategory(this.state.category.id).done(this.importFinished)
  }

  importFinished(json) {
    var category = this.state.category
    category.budget_items = category.budget_items.concat(json.imported)
    this.setState({category: category})
    showMessage(json.message)
    this.cancelImport()
  }

  cancelImport(e) {
    if (e) { e.preventDefault() }
    this.setState({importHidden: true});
  }

  openImport(e) {
    e.preventDefault()
    this.setState({importHidden: false});
  }

  moveBudgetItem(item_id) {
    var category    = this.state.category
    var idx = _.findIndex(category.budget_items, function(item) {
      return item.id === parseInt(item_id);
    });
    category.budget_items.splice(idx, 1)
    this.setState({category: category})
  }

  render() {
    return (
      <section>
        <CategoryList budget={this.state.budget}
                      moveBudgetItem={this.moveBudgetItem}
                      changeBudget={this.changeBudget}
                      currentCategoryId={this.state.category.id}
                      changeCategory={this.changeCategory} />

        <div className='large-10 medium-10 columns hide-for-small-down'>
          <div>
            <Category expenseFunctions={this.expenseFunctions()}
                      itemFunctions={this.itemFunctions()}
                      import={this.openImport}
                      category={this.state.category} />

            <div className='row collapse overviews'>
              <CategoryOverview category={this.state.category} monthlyIncome={this.state.budget.monthly_income} />
              <Overview budget={this.state.budget} saveBudget={this.saveBudget} />
            </div>
            <ImportModal category={this.state.category}
                         hidden={this.state.importHidden}
                         import={this.import}
                         cancel={this.cancelImport} />
          </div>
        </div>
        <Confirm name={this.state.modal.item.name}
                 hidden={this.state.modal.hidden}
                 cancel={this.cancelDelete}
                 delete={this.state.modal.delete} />
      </section>
    );
  }
}
