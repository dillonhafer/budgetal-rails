import React from 'react';
import CategoryList from './category_list';
import Category from './category';
import CategoryOverview from './category_overview';
import Overview from './overview';
import ImportModal from './import_modal';
import Confirm from '../../utils/confirm';
import {monthName, selectedValue, title, today} from '../../utils/helpers';

import {updateBudget} from '../../data/budget';
import {findCategory, importCategory} from '../../data/budget_category';
import {createItem, updateItem, destroyItem} from '../../data/budget_item';
import {createExpense, updateExpense, destroyExpense} from '../../data/budget_item_expense';

export default class CashFlowPlans extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showForm: false,
    budget: {
      month: this.props.params.month,
      year: this.props.params.year,
      budget_categories: [
        {name: 'Charity', id: 0},
        {name: 'Saving'},
        {name: 'Housing'},
        {name: 'Utilities'},
        {name: 'Food'},
        {name: 'Clothing'},
        {name: 'Transportation'},
        {name: 'Medical/Health'},
        {name: 'Insurance'},
        {name: 'Personal'},
        {name: 'Recreation'},
        {name: 'Debts'}
      ]
    },
    category: {
      id: 0,
      name: 'Charity',
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

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  confirmItemDelete = (budget_item, index) => {
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

  confirmExpenseDelete = (expense, index) => {
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

  cancelDelete = (e) => {
    if (e) { e.preventDefault() }
    this.setState({modal: {hidden: true, index: -1, item: {name: ''}, delete: function(){}}});
  }

  incrementMonth(date, number) {
    var year     = date.getFullYear();
    var month    = date.getMonth();
    var newMonth = month + number;
    return new Date(year, newMonth);
  }

  changeMonth = (number) => {
    var currentDate = new Date(this.state.budget.year, this.state.budget.month-1, 1);
    var newDate = this.incrementMonth(currentDate, number);
    var date = {year: newDate.getFullYear(), month: newDate.getMonth() + 1}
    this.context.history.push(`/budgets/${date.year}/${date.month}`)
  }

  changeBudget = () => {
    var year  = selectedValue('#budget_year');
    var month = selectedValue('#budget_month');
    this.context.history.push(`/budgets/${year}/${month}`)
  }

  showForm = (e) => {
    e.preventDefault();
    this.setState({showForm: true});
  }

  componentDidMount = () => {
    let budgetParams = Object.assign({}, this.props.params, {id: this.props.id});
    this._fetchBudget(budgetParams);
  }

  _fetchDataDone = (data) => {
    this.setState({
      budget: data.budget,
      category: data.budget_category
    });
    title(`${monthName(data.budget.month)} ${data.budget.year}`);
  }

  _fetchDataFail = (e) => {
    showMessage(e.message)
    this.context.history.replace('/');
  }

  changeCategory = (id) => {
    this._fetchBudget({
      year: this.state.budget.year,
      month: this.state.budget.month,
      id: id
    })
  }

  _fetchBudget = (data) => {
    findCategory(data)
      .then(this._fetchDataDone)
      .catch(this._fetchDataFail);
  }

  // Budget Item functions
  saveBudgetItem = (item) => {
    var data = {
      budget_category_id: this.state.category.id,
      budget_item: item
    }
    if (item.id === undefined) {
      createItem(data)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            this._saveItemFail(item.index, budget_item.errors);
          } else {
            this._budgetItemSaved(item.index, budget_item);
          }
        })
        .catch(this._fetchDataFail)
    } else {
      updateItem(item)
        .then((budget_item) => {
          if (!!budget_item.errors) {
            this._saveItemFail(item.index, budget_item.errors);
          } else {
            this._budgetItemSaved(item.index, budget_item);
          }
        })
        .catch(this._fetchDataFail)
    }
  }

  _budgetItemSaved = (index, budget_item) => {
    let category = this.state.category
    let budget = _.assign({}, this.state.budget, budget_item.budget)

    budget_item.budget_item_expenses = category.budget_items[index].budget_item_expenses || []
    category.budget_items[index] = budget_item

    this.setState({category: category, budget: budget})
    showMessage(`Saved ${budget_item.name}`)
  }

  _saveItemFail = (index, errors) => {
    let category = this.state.category
    _.where(category.budget_items, {'index': index})[0].errors = errors
    this.setState({category})
  }

  deleteBudgetItem = (e) => {
    e.preventDefault();
    var modal = this.state.modal;

    if (modal.item.id !== undefined) {
      destroyItem(modal.item.id)
        .then((resp) => {
          if (resp.success) {
            this._budgetItemDeleted(modal.index);
          } else {
            this._fetchDataFail(resp.message);
          }
        })
        .catch(this._fetchDataFail)
    }
  }

  _budgetItemDeleted = (index) => {
    let category = this.state.category
    category.budget_items.splice(index, 1)
    if (this.state.modal.item.id !== undefined) {
      showMessage("Deleted "+this.state.modal.item.name)
    }
    this.setState({category: category})
    this.cancelDelete()
  }

  addBudgetItem = (e) => {
    e.preventDefault()
    var category = this.state.category
    category.budget_items.push({category_id: category.id, amount_budgeted: 0.01})
    this.setState({category: category})
  }

  updateBudgetItem = (index, updatedBudgetItem) => {
    var category = this.state.category
    category.budget_items[index] = updatedBudgetItem
    this.setState({category: category})
  }

  saveBudget = (budget) => {
    updateBudget(budget)
      .then((resp) => {
        if (!!resp.errors) {
          this._saveBudgetFail(budget, resp.errors);
        } else {
          this._budgetUpdated(resp.budget);
        }
      })
      .catch(this._fetchDataFail)
  }

  _saveBudgetFail = (budget, errors) => {
    budget.errors = errors;
    this.setState({budget});
  }

  _budgetUpdated = (budget) => {
    showMessage('Updated Budget');
    this.setState({budget});
  }

  // Budget Item Expense functions
  addExpense = (id) => {
    var category = this.state.category
    var budget_item = _.where(category.budget_items, {'id': id})[0]
    budget_item.budget_item_expenses.push({budget_item_id: id, amount: 0.01, date: today()})
    this.setState({category: category})
  }

  saveExpense = (expense) => {
    var self = this;
    if (expense.id === undefined) {
      createExpense(expense)
        .then((resp) => {
          if (!!resp.errors) {
            self._saveExpenseFail(expense.index, resp.errors);
          } else {
            self._expenseSaved(expense.index, resp);
          }
        })
        .catch(this._fetchDataFail)
    } else {
      updateExpense(expense)
        .then((resp) => {
          if (!!resp.errors) {
            self._saveExpenseFail(expense.index, resp.errors);
          } else {
            self._expenseSaved(expense.index, resp);
          }
        })
        .catch(this._fetchDataFail)
    }
  }

  _saveExpenseFail = (index, errors) => {
    let category = this.state.category
    let budget_item = _.where(category.budget_items, {'id': index.budget_item_id})[0]
    _.where(budget_item.budget_item_expenses, {'index': index.index})[0].errors = errors
    this.setState({category: category})
  }

  _expenseSaved = (index, expense) => {
    let category = this.state.category
    let budget = _.assign({}, this.state.budget, expense.budget)
    var budget_item = _.where(category.budget_items, {'id': expense.budget_item_id})[0]

    budget_item.budget_item_expenses[index] = expense
    this.setState({category: category, budget: budget})
    showMessage(`Saved ${expense.name}`)
  }

  updateExpense = (index, updatedExpense) => {
    var category    = this.state.category
    var budget_item = _.where(category.budget_items, {'id': updatedExpense.budget_item_id})[0]
    budget_item.budget_item_expenses[index] = updatedExpense
    this.setState({category: category})
  }

  deleteExpense = (e) => {
    e.preventDefault();
    var modal = this.state.modal;

    if (modal.item.id !== undefined) {
      destroyExpense(modal.item.id)
        .then((resp) => {
          this._expenseDeleted(modal.item.budget_item_id, modal.index);
        })
        .catch(this._fetchDataFail)
    }
  }

  _expenseDeleted = (budget_item_id, index) => {
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

  _import = (e) => {
    e.preventDefault();
    importCategory(this.state.category.id)
      .then((resp) => {
        this.importFinished(resp.imported, resp.message);
      })
      .catch(this._fetchDataFail)
  }

  importFinished = (imported_items, message) => {
    var category = this.state.category
    category.budget_items = category.budget_items.concat(imported_items)
    this.setState({category: category})
    showMessage(message)
    this.cancelImport()
  }

  cancelImport = (e) => {
    if (e) { e.preventDefault() }
    this.setState({importHidden: true});
  }

  openImport = (e) => {
    e.preventDefault()
    this.setState({importHidden: false});
  }

  moveBudgetItem = (item_id) => {
    var category    = this.state.category
    var idx = _.findIndex(category.budget_items, function(item) {
      return item.id === parseInt(item_id);
    });
    category.budget_items.splice(idx, 1)
    this.setState({category: category})
  }

  render() {
    return (
      <div>
        <section>
          <CategoryList budget={this.state.budget}
                        moveBudgetItem={this.moveBudgetItem}
                        changeBudget={this.changeBudget}
                        changeMonth={this.changeMonth}
                        currentCategoryId={this.state.category.id}
                        changeCategory={this.changeCategory} />

          <div className='large-10 medium-10 columns hide-for-small-down'>
            <div>
              <Category expenseFunctions={this.expenseFunctions()}
                        itemFunctions={this.itemFunctions()}
                        import={this.openImport}
                        category={this.state.category} />

              <div className='row collapse cash-flow-row overviews'>
                <CategoryOverview category={this.state.category} monthlyIncome={this.state.budget.monthly_income} />
                <Overview budget={this.state.budget} saveBudget={this.saveBudget} />
              </div>
              <ImportModal category={this.state.category}
                           hidden={this.state.importHidden}
                           import={this._import}
                           cancel={this.cancelImport} />
            </div>
          </div>
          <Confirm name={this.state.modal.item.name}
                   hidden={this.state.modal.hidden}
                   cancel={this.cancelDelete}
                   delete={this.state.modal.delete} />
        </section>
        <div className='row'></div>
      </div>
    );
  }
}
